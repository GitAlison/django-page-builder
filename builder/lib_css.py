import cssutils
from filtercss import filter_css


def remove_unused_css(css_content, html_content):
    res_css = filter_css(css_content, html_content)
    return res_css


# Example usage
#remove_unused_css('styles.css', 'index.html')
