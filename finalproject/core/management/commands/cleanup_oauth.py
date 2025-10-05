from django.core.management.base import BaseCommand
from allauth.socialaccount.models import SocialApp

class Command(BaseCommand):
    help = 'Clean up duplicate OAuth social applications'

    def handle(self, *args, **options):
        # Get all social apps
        github_apps = SocialApp.objects.filter(provider='github')
        google_apps = SocialApp.objects.filter(provider='google')
        facebook_apps = SocialApp.objects.filter(provider='facebook')
        
        self.stdout.write('Current OAuth applications:')
        self.stdout.write(f'GitHub apps: {github_apps.count()}')
        self.stdout.write(f'Google apps: {google_apps.count()}')
        self.stdout.write(f'Facebook apps: {facebook_apps.count()}')
        
        # Keep only the first app for each provider and delete duplicates
        providers = ['github', 'google', 'facebook']
        
        for provider in providers:
            apps = SocialApp.objects.filter(provider=provider)
            if apps.count() > 1:
                # Keep the first one, delete the rest
                first_app = apps.first()
                duplicates = apps.exclude(id=first_app.id)
                deleted_count = duplicates.count()
                duplicates.delete()
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Deleted {deleted_count} duplicate {provider} app(s), kept: {first_app.name}'
                    )
                )
            elif apps.count() == 1:
                self.stdout.write(f'{provider.capitalize()} app is unique: {apps.first().name}')
            else:
                self.stdout.write(f'No {provider} apps found')
        
        self.stdout.write(self.style.SUCCESS('OAuth cleanup completed!'))