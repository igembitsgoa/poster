
import os
from bs4 import BeautifulSoup, Doctype

with open('dist/Poster/index.html', 'r') as file:
    soup = BeautifulSoup(file, 'html5lib')

# remove <!DOCTYPE html>
for item in soup.contents:
    if isinstance(item, Doctype):
        item.extract()

# if JS present
filename = 'dist/index.bundle.js'
if (os.path.isfile(filename)):
    with open(filename, 'r') as file:
        script_file = file.read()

    # delete script tag
    soup.find('script').decompose()

    # embed JS in HTML
    body_tag = soup.find('body')
    script_tag = soup.new_tag('script')
    script_tag.attrs['id'] = "main_script"
    script_tag.string = script_file
    body_tag.append(script_tag)

    # write more JS to change &amp; to & in above JS
    # because iGEM replaces all & to &amp; even in JS
    script_tag = soup.new_tag('script')
    script_tag.string = """
        var script = document.querySelector("#main_script").innerHTML;
        script = script.replace("&amp;", "&");
        document.querySelector("#main_script").innerHTML = script;

    """
    body_tag.append(script_tag)


    # delete JS file
    os.remove(filename)

# if CSS present
filename = "dist/css/index.css"
if (os.path.isfile('dist/css/index.css')):
    with open(filename, 'r') as file:
        css_file = file.read()

    # embed CSS in HTML
    head_tag = soup.find('head')
    style_tag = soup.new_tag("style")
    style_tag.string = css_file
    head_tag.append(style_tag)

    # delete CSS file
    os.remove(filename)

# delete link tag
soup.find('link').decompose()

with open('dist/Poster/index.html', 'wb') as file:
    file.write(soup.prettify('utf-8'))
