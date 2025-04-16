
# SafeWatch AI Guardian Django Backend

This is the Django backend for the SafeWatch AI Guardian system, providing API endpoints for the React frontend.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a .env file from the example:
   ```
   cp .env.example .env
   ```
   Then edit the .env file with your specific settings.

5. Run migrations:
   ```
   python manage.py makemigrations api
   python manage.py migrate
   ```

6. (Optional) Load fixture data for testing:
   ```
   python manage.py loaddata fixtures.json
   ```

7. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

8. Run the development server:
   ```
   python manage.py runserver
   ```

The API will be available at http://localhost:8000/api/

## API Endpoints

- **Cameras**: `/api/cameras/`
  - Get all cameras: GET `/api/cameras/`
  - Get camera by ID: GET `/api/cameras/{id}/`
  - Update camera status: PATCH `/api/cameras/{id}/update_status/`
  - Update threat level: PATCH `/api/cameras/{id}/update_threat_level/`

- **Alerts**: `/api/alerts/`
  - Get all alerts: GET `/api/alerts/`
  - Get alert by ID: GET `/api/alerts/{id}/`
  - Acknowledge alert: POST `/api/alerts/{id}/acknowledge/`
  - Create alert: POST `/api/alerts/`

- **Incidents**: `/api/incidents/`
  - Get all incidents: GET `/api/incidents/`
  - Get incident by ID: GET `/api/incidents/{id}/`
  - Update incident status: PATCH `/api/incidents/{id}/update_status/`
  - Create incident: POST `/api/incidents/`

- **Risk Zones**: `/api/risk-zones/`
  - Get all risk zones: GET `/api/risk-zones/`

- **Statistics**: `/api/statistics/`
  - Get system statistics: GET `/api/statistics/`

- **SOS**: `/api/sos/trigger/`
  - Trigger SOS alert: POST `/api/sos/trigger/`

## Admin Interface

Access the admin interface at http://localhost:8000/admin/ using your superuser credentials.

## Frontend Integration

Make sure to set the correct API URL in your frontend's .env file:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

This will ensure your React frontend connects to the Django backend properly.
