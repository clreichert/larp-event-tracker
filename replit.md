# LARP Event Tracking Application

## Project Overview
A full-stack event management application for tracking LARP (Live Action Role Play) events with real-time party progress, issue tracking, and combat encounters.

## Current Features

### 1. Admin Dashboard
- **Open Issues Widget**: Clickable widget showing total open issues and high-priority count
- **Party Summary Cards**: Grid of all parties with:
  - Overall progress (completed/total encounters with progress bar)
  - Combat encounters counter
  - Open issues list
  - Recent activity
  - Clickable to navigate to party detail page

### 2. Issues Tracker
- **Issues Table**: 
  - Sortable columns (Time, Party, Job, Priority, Status, Type)
  - Filter by party and status
  - Search functionality
  - Icon indicator for issues with additional detail in ledger
  - Click edit to open issue detail page
- **Log New Issue Form**: Create new issue entries

### 3. Party Paths
- **Table View**: List of all parties with encounter summaries
- **Party Detail Page**:
  - Summary widgets (Progress, Combat, Open Issues)
  - Collapsible Open Issues section
  - Combat Encounters section (shows all combats party participated in)
  - Party Path table with clickable status toggles
  - Character, Time, Purpose, Item columns
  - Ad hoc notes section

### 4. Combat Tracker
- **Combat List**: All roaming combat encounters with check-in status
- **Combat Detail/Check-In**:
  - Checklist of all parties
  - Quick checkbox to mark which parties were encountered
  - Notes field for each party (appears when checked)
  - Save functionality

## Data Structure

### Parties
Arden, Clairia, P'Loa, Uri-Kesh, Doloron, Sythwan, Noctara, Keer, Waylon, Elsewhich, Glendeep

### Roles
Keeper, Traveler, Seeker, Ranger, Maker, Caster

### Issue Types
Medical, General, Opportunity!

### Issue Status
Monitoring, Fixing, Hopefully fixed

### Issue Priority
Low, High

### Combat Types
Creatures, Humanoid, Elemental, Magical, Undead

## Design Approach
- **Design System**: Fluent Design (Microsoft) optimized for productivity applications
- **Typography**: Inter font family
- **Focus**: Information density, clear hierarchy, efficient workflows

## Future Enhancements

### Event Configuration System (Post-MVP)
**Priority**: Low (implement after main UI is complete)

**Requirement**: Database interface for configuring new events before they start. Each event has different:
- Party lists
- Encounter schedules
- Combat encounters
- Character/NPC data
- Items and artifacts

**Purpose**: Allow admins to set up event-specific data without code changes. This is separate from the runtime event tracking UI and can be implemented last since it's administrative setup, not live event operations.

## Technical Stack
- **Frontend**: React, Wouter (routing), TanStack Query, Shadcn UI
- **Backend**: Express.js with comprehensive API routes
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Data Persistence**: All data persisted in database (parties, encounters, combat, issues, feedback)

## Pages & Routes
- `/` - Admin Dashboard
- `/issues` - Issues Tracker
- `/party-paths` - Party Paths List
- `/party/:partyName` - Party Detail Page
- `/combat` - Combat Tracker List
- `/combat/:combatId` - Combat Check-In Detail

## User Roles
- **Admin**: Full access to all features (dashboard, issues, party detail)
- **Staff**: Access to party paths and combat tracker (not yet implemented)

## Database Schema
- **Parties**: All 11 parties with unique names
- **Encounters**: Party path encounters linked to parties
- **Combat Encounters**: Roaming combat encounters
- **Combat Checkins**: Track which parties encountered which combat
- **Issues**: Issue tracking with timestamps and priority
- **Feedback**: User feedback system with status tracking

## API Routes
- `GET/POST /api/feedback` - Feedback management
- `PATCH /api/feedback/:id` - Update feedback status
- `GET /api/parties` - All parties
- `GET /api/parties/:name` - Party by name
- `GET /api/encounters` - All encounters
- `GET /api/encounters/party/:partyId` - Encounters by party
- `PATCH /api/encounters/:id` - Update encounter status/notes
- `GET /api/combat-encounters` - All combat encounters
- `GET /api/combat-checkins` - All combat checkins
- `GET /api/combat-checkins/:combatId` - Checkins by combat
- `PATCH /api/combat-checkins/:id` - Update checkin status/notes
- `GET/POST /api/issues` - Issues management
- `PATCH /api/issues/:id` - Update issue

## Notes
- Combat encounters are roaming/independent from party path schedules
- Party path encounters are pre-scheduled in handbook
- Database seeded with sample event data for 11 parties
- Issue detail page with chronological ledger still needs implementation
- Encounter detail page still needs implementation
