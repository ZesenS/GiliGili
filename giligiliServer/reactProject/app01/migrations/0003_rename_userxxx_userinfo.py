# Generated by Django 4.0.1 on 2023-10-27 11:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app01', '0002_rename_userinfo_userxxx'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserXXX',
            new_name='UserInfo',
        ),
    ]
