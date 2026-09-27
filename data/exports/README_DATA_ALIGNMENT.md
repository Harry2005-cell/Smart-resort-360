# 🏨 Smart Resort 360 — Project Datasets & Schema Alignment Guide

This export package contains all core domain datasets of the **Smart Resort 360** multi-agent resort management platform in both **JSON** and **CSV** formats, along with schema definitions.

---

## 📁 Included Datasets

### 1. `inventory.json` & `inventory.csv`
- **Domain**: Resort Stock & Supply Chain
- **Key Fields**:
  - `id`: Unique inventory item identifier
  - `name`: Name of item (e.g., Coorg Artisan Coffee Pods, Luxury Botanical Bath Kits)
  - `category`: Category (`FOOD_BEVERAGE`, `HOUSEKEEPING`, `MAINTENANCE`, `AMENITIES`, `SPA`)
  - `currentStock`: Real-time stock level
  - `minStock`: Minimum safety threshold
  - `unitCost`: Price per unit in INR (₹)
  - `supplierName`: Associated vendor name
  - `location`: Resort storage zone

### 2. `inventory_requests.json` & `inventory_requests.csv`
- **Domain**: Inventory Staff Portal & Predictive Stock Depletion Engine
- **Key Fields**:
  - `poNumber`: Auto-generated Purchase Order number (e.g., `PO-MLK-901`)
  - `sku`: Product SKU code
  - `itemName`: Name of item requested
  - `requestedQty`: Quantity auto-recommended by AI agent
  - `priority`: Escalation priority (`CRITICAL`, `HIGH`, `MEDIUM`)
  - `reason`: Depletion timeline and burn rate explanation
  - `raisedBy`: Source agent (`InventoryManagementAgent (Predictive Engine)`)
  - `status`: Request state (`PENDING`, `APPROVED`, `REJECTED`)
  - `approvedBy`: Approver designation (`Inventory Staff`)

### 3. `staff_directory.json` & `staff_directory.csv`
- **Domain**: Staff Operations & Dynamic Dispatch System
- **Key Fields**:
  - `employeeId`: Staff ID code (e.g., `EMP-101`)
  - `name`: Staff member full name (e.g., Vikram Patel, Rajesh Kumar, Priya Sharma)
  - `position`: Job designation (e.g., Senior Maintenance Technician)
  - `department`: Department (`MAINTENANCE`, `HOUSEKEEPING`, `CONCIERGE`, `FOOD_BEVERAGE`, `SPA`, `SECURITY`)
  - `shift`: Shift assignment (`MORNING`, `AFTERNOON`, `NIGHT`)
  - `status`: Current duty state (`AVAILABLE`, `DISPATCHED`, `ON_DUTY`)
  - `currentZone`: Active resort zone assignment
  - `workloadPct`: Workload capacity utilization (%)
  - `performanceScore`: Performance rating out of 5.0

### 4. `guest_interactions.json` & `guest_interactions.csv`
- **Domain**: AI Concierge & Guest Experience Tracking
- **Key Fields**:
  - `id`: Interaction ID
  - `guestName`: VIP Guest name
  - `roomNumber`: Suite/Villa room identifier
  - `type`: Interaction classification (`COMPLAINT`, `SERVICE_REQUEST`, `INQUIRY`)
  - `channel`: Interface channel (`AI_CONCIERGE`, `CONCIERGE_CHAT`)
  - `sentiment`: Sentiment flag (`POSITIVE`, `NEUTRAL`, `NEGATIVE`)
  - `summary`: Message / Complaint content
  - `handledBy`: Agent or staff dispatcher (`StaffSchedulingAgent`, `AI Concierge`)

### 5. `work_orders_and_service_requests.json` & `work_orders_and_service_requests.csv`
- **Domain**: Maintenance & Engineering Service Dispatch
- **Key Fields**:
  - `id`: Work order ID
  - `title`: Ticket description
  - `category`: Ticket area (`PLUMBING`, `HVAC`, `ELECTRICAL`, `HOUSEKEEPING`)
  - `priority`: Severity rating (`CRITICAL`, `HIGH`, `MEDIUM`)
  - `status`: Status (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
  - `roomNumber`: Room location
  - `assignedStaff`: Staff member dispatched

### 6. `rooms_and_occupancy.json` & `rooms_and_occupancy.csv`
- **Domain**: 3D Digital Twin & Room Infrastructure
- **Key Fields**:
  - `number`: Room number (e.g., `Villa 101`, `Suite 204`)
  - `type`: Room type (`STANDARD`, `DELUXE`, `SUITE`, `VILLA`, `PRESIDENTIAL`)
  - `status`: Occupancy status (`AVAILABLE`, `OCCUPIED`, `CLEANING`, `MAINTENANCE`)
  - `basePrice`: Tariff per night (₹)
  - `temperature`: IoT climate reading (°C)
  - `energyStatus`: Energy mode (`NORMAL`, `HIGH`, `LOW`)
  - `maintenanceRisk`: Predictive failure risk score (0.0 to 1.0)

### 7. `agent_runs_history.json` & `agent_runs_history.csv`
- **Domain**: Multi-Agent GEN AI Command Center Execution Log
- **Key Fields**:
  - `agentName`: AI Agent identifier (`OrchestratorAgent`, `StaffSchedulingAgent`, `InventoryManagementAgent`, `RevenueOptimizationAgent`)
  - `prompt`: Input prompt / event trigger
  - `summary`: Execution outcome summary
  - `confidence`: Model confidence score (0.0 to 1.0)
  - `durationMs`: Execution latency in milliseconds
  - `triggeredBy`: Source trigger (`GUEST_AI_CONCIERGE`, `INVENTORY_STAFF`, `SYSTEM`)
  - `status`: Final run state (`COMPLETED`, `FAILED`)

---

## 🔄 Multi-Agent Connection Flow

```
[Guest AI Concierge] ── (Complaint Raised) ──> [Staff Scheduling Agent]
                                                       │
                                            (Dynamic Staff Dispatch)
                                                       │
                                                       ▼
                                            [Staff Task Dashboard] &
                                            [Manager Staff Scheduling Output]
                                                       ▲
                                                       │
                                            [Inventory Staff Portal]
                                                       ▲
                                                       │
                                   [Predictive Depletion Engine (InventoryAgent)]
```
