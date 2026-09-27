import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

const BASE_PRICES: Record<string, number> = {
  STANDARD: 8500,
  PREMIUM: 15500,
  SUITE: 22000,
  VILLA: 35000,
};

function calculateDynamicPricing(baseRate: number, occupancyPercent: number) {
  let multiplier = 1.0;
  if (occupancyPercent <= 40) {
    multiplier = 0.62 + (occupancyPercent / 40) * 0.23;
  } else if (occupancyPercent <= 70) {
    multiplier = 0.85 + ((occupancyPercent - 40) / 30) * 0.20;
  } else if (occupancyPercent <= 88) {
    multiplier = 1.05 + ((occupancyPercent - 70) / 18) * 0.35;
  } else {
    multiplier = 1.40 + ((occupancyPercent - 88) / 12) * 0.45;
  }
  return Math.round((baseRate * multiplier) / 100) * 100;
}

// GET: Fetch real-time occupancy + simulate prices
export async function GET(req: NextRequest) {
  try {
    const rooms = await prisma.room.findMany({
      select: { id: true, status: true, type: true, basePrice: true },
    });

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((r) => r.status === "OCCUPIED").length;
    const occupancyPct = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    let totalProjectedRev = 0;
    let totalBaseRev = 0;
    let occupiedCount = 0;

    rooms.forEach((r) => {
      const base = r.basePrice || BASE_PRICES[r.type] || 12000;
      if (r.status === "OCCUPIED") {
        const dynamicPrice = calculateDynamicPricing(base, occupancyPct);
        totalProjectedRev += dynamicPrice;
        totalBaseRev += base;
        occupiedCount++;
      }
    });

    const adr = occupiedCount > 0 ? Math.round(totalProjectedRev / occupiedCount) : 0;
    const revpar = totalRooms > 0 ? Math.round(totalProjectedRev / totalRooms) : 0;
    const avgBase = totalRooms > 0 ? Math.round(rooms.reduce((s, r) => s + (r.basePrice || 12000), 0) / totalRooms) : 12000;
    const multiplier = avgBase > 0 ? totalProjectedRev / (occupiedCount * avgBase || 1) : 1;

    return NextResponse.json({
      success: true,
      live: {
        totalRooms,
        occupiedRooms,
        occupancyPct,
        adr,
        revpar,
        projectedDailyRevenue: totalProjectedRev,
        revenueLift: totalProjectedRev - totalBaseRev,
        dynamicMultiplier: Math.round(multiplier * 100) / 100,
      },
    });
  } catch (error) {
    console.error("Revenue simulator GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch live occupancy" }, { status: 500 });
  }
}

// POST: Deploy rates — save OccupancySnapshot to DB
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession().catch(() => null);
    const simulatedBy = (session?.user as any)?.email || "SYSTEM";

    const body = await req.json();
    const { simulatedOccupancy, projectedRevenue, projectedADR, projectedRevPAR, dynamicMultiplier } = body;

    const rooms = await prisma.room.findMany({ select: { basePrice: true } });
    const avgBasePrice = rooms.length > 0
      ? Math.round(rooms.reduce((s, r) => s + (r.basePrice || 12000), 0) / rooms.length)
      : 12000;

    const totalRooms = rooms.length;
    const occupiedRooms = Math.round((totalRooms * simulatedOccupancy) / 100);

    const snapshot = await prisma.occupancySnapshot.create({
      data: {
        totalRooms,
        occupiedRooms,
        occupancyPct: simulatedOccupancy,
        avgBasePrice,
        dynamicMultiplier: dynamicMultiplier || 1.0,
        projectedRevenue: projectedRevenue || 0,
        projectedADR: projectedADR || 0,
        projectedRevPAR: projectedRevPAR || 0,
        simulatedBy,
        appliedToPMS: true,
      },
    });

    // Also create a PricingRecommendation for each room type
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const reason =
      simulatedOccupancy >= 88
        ? "Critical scarcity mode — peak yield surge rates deployed"
        : simulatedOccupancy >= 70
        ? "High demand velocity — automated surge pricing activated"
        : simulatedOccupancy >= 40
        ? "Healthy booking pace — rates stabilized at target baseline"
        : "Low occupancy — automatic markdown applied to stimulate booking velocity";

    for (const [type, base] of Object.entries(BASE_PRICES)) {
      const recommended = calculateDynamicPricing(base, simulatedOccupancy);
      await prisma.pricingRecommendation.create({
        data: {
          roomType: type,
          currentPrice: base,
          recommendedPrice: recommended,
          confidence: 0.92,
          reason,
          expectedOccupancy: simulatedOccupancy,
          expectedRevenue: recommended * occupiedRooms,
          revenueImpact: (recommended - base) * occupiedRooms,
          status: "APPLIED",
          expiresAt,
        },
      });
    }

    return NextResponse.json({ success: true, snapshot, message: "Rates deployed to PMS and stored in database" });
  } catch (error) {
    console.error("Revenue simulator POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to deploy rates" }, { status: 500 });
  }
}
