# Generated by Django 4.2.8 on 2023-12-28 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('builder', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='datagrapejs',
            name='data',
            field=models.TextField(default='', verbose_name='data'),
            preserve_default=False,
        ),
    ]
