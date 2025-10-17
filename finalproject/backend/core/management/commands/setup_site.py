from django.core.management.base import BaseCommand
from django.contrib.sites.models import Site
from django.conf import settings

class Command(BaseCommand):
    help = 'Create or update the Site object for OAuth to work'

    def handle(self, *args, **options):
        site_id = getattr(settings, 'SITE_ID', 1)
        domain = '127.0.0.1:8080'
        name = 'Django API + React Frontend'
        
        try:
            site = Site.objects.get(pk=site_id)
            site.domain = domain
            site.name = name
            site.save()
            self.stdout.write(
                self.style.SUCCESS(f'Updated Site {site_id}: {domain}')
            )
        except Site.DoesNotExist:
            site = Site.objects.create(
                pk=site_id,
                domain=domain,
                name=name
            )
            self.stdout.write(
                self.style.SUCCESS(f'Created Site {site_id}: {domain}')
            )
        
        self.stdout.write(
            self.style.SUCCESS('Site setup complete! OAuth should now work.')
        )