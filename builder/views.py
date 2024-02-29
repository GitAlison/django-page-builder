from django.shortcuts import render, get_object_or_404
from django.contrib.flatpages.models import FlatPage
from django.template import loader
from .lib_css import remove_unused_css

from .models import DataGrapeJs

# Create your views here.


def page_constructor(request, object_id, form_url="", extra_context=None):
    print('Modelo', object_id)
    flat_page = get_object_or_404(FlatPage, id=object_id)
    try:
        grape_js_instance = DataGrapeJs.objects.get(flat_page__id=object_id)
    except DataGrapeJs.DoesNotExist:
        grape_js_instance = DataGrapeJs.objects.create(flat_page=flat_page, data='')



    content_css = loader.render_to_string('builder/tailwindcss.css')

    if request.method == 'POST':
        css_tailwind = remove_unused_css(content_css, flat_page.content)

        content = request.POST.get('content')
        page_data = request.POST.get('pageData')
        css = request.POST.get('css')

        flat_page.content = content
        flat_page.save()

        grape_js_instance.data = page_data
        grape_js_instance.css = css + css_tailwind

        grape_js_instance.save()


    return render(request, 'builder/page_builder.html', context={'grapejs': grape_js_instance})
