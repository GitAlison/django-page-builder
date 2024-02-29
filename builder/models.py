from django.db import models
from django.contrib.flatpages.models import FlatPage


class DataGrapeJs(models.Model):
    flat_page = models.ForeignKey(FlatPage, related_name='grapejs', on_delete=models.CASCADE)
    data = models.TextField('data')
    css = models.TextField('css', null=True, blank=True)
    js = models.TextField('js', null=True, blank=True)
