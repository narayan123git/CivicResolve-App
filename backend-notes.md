
# CivicResolve AI: Backend & Database Structure

This document outlines a potential backend structure for the CivicResolve AI application. The frontend is designed to work with an API that follows this structure.

## Technology Stack Suggestion

- **Backend Framework:** Node.js with Express.js or a more comprehensive framework like NestJS.
- **Database:** PostgreSQL with PostGIS extension for efficient geospatial queries.
- **Object-Relational Mapping (ORM):** Prisma or TypeORM to interact with the database in a type-safe way.
- **Authentication:** JWT (JSON Web Tokens) for stateless authentication.
- **File Storage:** A cloud storage solution like Amazon S3, Google Cloud Storage, or Cloudinary for storing report images.

## Database Schema

Here is a proposed schema for the primary database tables.

### `users`

Stores information about citizens and municipal staff.

- `id` (UUID, Primary Key)
- `email` (String, Unique, Indexed)
- `password_hash` (String)
- `full_name` (String)
- `role` (Enum: `'CITIZEN'`, `'ADMIN'`)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### `reports`

The core table for storing all civic issue reports.

- `id` (Serial, Primary Key)
- `title` (String)
- `description` (Text)
- `image_url` (String) - URL pointing to the image in cloud storage.
- `location` (Geography - Point) - Using PostGIS for location data.
- `status` (Enum: `'SUBMITTED'`, `'IN_PROGRESS'`, `'RESOLVED'`) - Default: `'SUBMITTED'`
- `priority` (Enum: `'LOW'`, `'MEDIUM'`, `'HIGH'`)
- `category_id` (Integer, Foreign Key to `categories.id`)
- `submitter_id` (UUID, Foreign Key to `users.id`)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)
- `resolved_at` (Timestamp, Nullable)

### `categories`

A lookup table for report categories.

- `id` (Serial, Primary Key)
- `name` (String, Unique) - e.g., 'Pothole', 'Streetlight Outage'

## API Endpoints (RESTful)

All endpoints should be prefixed with `/api/v1`.

### Authentication

- `POST /auth/register` - Creates a new user account.
- `POST /auth/login` - Authenticates a user and returns a JWT.
- `GET /auth/me` - Returns the profile of the currently authenticated user.

### Reports

- `POST /reports`
  - **Auth:** Citizen, Admin
  - **Body:** `{ description, image, latitude, longitude }` (Image is multipart/form-data)
  - **Action:**
    1. Uploads the image to cloud storage.
    2. Calls the Gemini API (from the backend) to get a suggested title, category, and priority.
    3. Creates a new report record in the database.
    4. Returns the newly created report object.

- `GET /reports`
  - **Auth:** Citizen, Admin
  - **Query Params:** `status`, `category`, `sortBy`, `limit`, `page`
  - **Action:** Returns a paginated list of reports. If the user is a citizen, it could be filtered to their own reports by default. Admins can see all reports.

- `GET /reports/:id`
  - **Auth:** Citizen (own report), Admin
  - **Action:** Returns the details of a single report.

- `PUT /reports/:id`
  - **Auth:** Admin
  - **Body:** `{ status, category, priority }`
  - **Action:** Updates the status or other admin-modifiable fields of a report.

### Analytics (Admin only)

- `GET /analytics/summary`
  - **Auth:** Admin
  - **Action:** Returns key metrics like total reports, resolved count, in-progress count.

- `GET /analytics/by-category`
  - **Auth:** Admin
  - **Action:** Returns the count of reports for each category.

## AI Integration (Backend)

To protect the Gemini API key, all calls to the Gemini API should be made from the backend, not the frontend.

- **Endpoint:** `POST /ai/analyze-issue` (This could be an internal service called by the `POST /reports` endpoint)
- **Action:**
  1. Receives the description and image data.
  2. Constructs the prompt for the Gemini API.
  3. Calls `ai.models.generateContent` with the prompt, image, and a JSON schema for the response.
  4. Parses the response and returns the structured data (category, priority, title) to the calling service.
  
This backend-centric approach ensures security, scalability, and better control over the AI logic.
