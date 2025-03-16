# Deployment Instructions

## Supabase Setup

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com/) and sign up or log in
   - Create a new project
   - Note your project URL and anon key (these should already be in your .env file)

2. **Set Up GitHub Repository**
   - Push your code to a GitHub repository
   - In your repository settings, add the following secrets:
     - `SUPABASE_ACCESS_TOKEN`: Generate from your Supabase account settings
     - `SUPABASE_PROJECT_ID`: Your Supabase project ID (found in project settings)
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase project anon key

3. **Manual Deployment (if not using GitHub Actions)**

   Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

   Login to Supabase:
   ```bash
   supabase login
   ```

   Link your project:
   ```bash
   supabase link --project-ref <your-project-id>
   ```

   Deploy migrations:
   ```bash
   supabase db push
   ```

   Deploy edge functions:
   ```bash
   supabase functions deploy get-competitions
   supabase functions deploy save-competition
   supabase functions deploy enter-competition
   ```

   Build your application:
   ```bash
   npm run build
   ```

   Deploy static assets:
   ```bash
   supabase storage cp ./dist supabase://static
   ```

4. **Access Your Deployed Application**
   - Your application will be available at: `https://<your-project-id>.supabase.co/storage/v1/object/public/static/index.html`

## Database Schema

The application uses the following tables:

1. **competitions** - Stores competition information
2. **saved_competitions** - Tracks which competitions users have saved
3. **competition_entries** - Records user entries to competitions

## Edge Functions

The application uses the following edge functions:

1. **get-competitions** - Retrieves and filters competitions
2. **save-competition** - Allows users to save competitions
3. **enter-competition** - Processes competition entries

## Troubleshooting

- If you encounter CORS issues, ensure your Supabase project has the correct CORS configuration
- For authentication issues, check that your environment variables are correctly set
- For deployment failures, check the GitHub Actions logs for detailed error messages