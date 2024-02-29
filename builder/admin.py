from django.contrib import admin
from django.contrib.flatpages.models import FlatPage
from django.contrib.flatpages.admin import FlatPageAdmin as FlatPageAdminBase
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from django.shortcuts import reverse
from django.urls import path
from . import views

# Register your models here.
class BuilderAdmin(admin.AdminSite):
    site_header = "Django Builder Admin"
    site_title = 'Django Builder Admin'
    index_title = 'Django Builder Admin'


builder_site = BuilderAdmin(name="BuilderAdmin")


class FlatPageAdmin(FlatPageAdminBase):
    list_display = ("url", "title", 'page_constructor')
    fieldsets = (
        (None, {"fields": ("url", "title", "sites")}),
        (
            _("Advanced options"),
            {
                "classes": ("collapse",),
                "fields": ("registration_required", "template_name"),
            },
        ),
    )

    def page_constructor(self, obj):
        return format_html('<a href="%s" class="changelink">%s</a>' % (
            reverse('BuilderAdmin:flatpages_flatpage_constructor', args={obj.id}), _('Constructor')))
    page_constructor.allow_tags = True
    page_constructor.short_description = _('Actions')

    def get_urls(self):
        info = self.opts.app_label, self.opts.model_name
        urls = super().get_urls()
        custom_url = [
            path(
                "<path:object_id>/constructor/",
                views.page_constructor,
                name="%s_%s_constructor" % info,
            )
        ]
        return custom_url + urls
        
    # def add_view(self, request, form_url="", extra_context=None):
    #     contentCSS = loader.render_to_string('builder/tailwind.css')
    #     print(contentCSS)
    #     if request.method == 'POST':
    #         site = Site.objects.first();
    #         content = request.POST.get('content')
    #         pageData = request.POST.get('pageData')
    #         css = request.POST.get('css')
    #         page = FlatPage.objects.create(
    #             url='/contato2/',
    #             title="Contato2",
    #             content=content,
    #         )
    #         page.sites.add(site)
    #         DataGrapeJs.objects.create(
    #             flat_page=page,
    #             data=pageData,
    #             css=css,
    #         )
    #     return render(request, 'builder/page_builder.html')
    #
    # def change_view(self, request, object_id, form_url="", extra_context=None):
    #     grape_js_instance = get_object_or_404(DataGrapeJs, flat_page_id=object_id)
    #     flat_page = get_object_or_404(FlatPage, id=object_id)
    #     content_css = loader.render_to_string('builder/tailwindcss.css')
    #
    #     if request.method == 'POST':
    #         css_tailwind = remove_unused_css(content_css, flat_page.content)
    #
    #         content = request.POST.get('content')
    #         page_data = request.POST.get('pageData')
    #         css = request.POST.get('css')
    #
    #         flat_page.content = content
    #         flat_page.save()
    #
    #         grape_js_instance.data = page_data
    #         grape_js_instance.css = css + css_tailwind
    #
    #         grape_js_instance.save()
    #
    #     return render(request, 'builder/page_builder.html', context={'grapejs': grape_js_instance})


builder_site.register(FlatPage, FlatPageAdmin)
