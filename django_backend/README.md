
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
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

The API will be available at http://localhost:8000/api/

## API Endpoints

- **Cameras**: `/api/cameras/`
- **Alerts**: `/api/alerts/`
- **Incidents**: `/api/incidents/`
- **Risk Zones**: `/api/risk-zones/`
- **Statistics**: `/api/statistics/`
- **SOS**: `/api/sos/trigger/`

## Admin Interface

Access the admin interface at http://localhost:8000/admin/ using your superuser credentials.
