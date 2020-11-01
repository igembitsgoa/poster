
import os
from bs4 import BeautifulSoup, Doctype

with open('dist/Poster/index.html', 'r') as file:
    soup = BeautifulSoup(file, 'html5lib')

# remove <!DOCTYPE html>
for item in soup.contents:
    if isinstance(item, Doctype):
        item.extract()

if (os.path.isfile('dist/index.bundle.js')):
    with open('dist/index.bundle.js', 'r') as file:
        script_file = file.read()

    # embed JS in HTML
    script_tag = soup.find('script')
    script_tag.string = script_file
    del script_tag.attrs['src']

    os.remove('dist/index.bundle.js')

with open('dist/Poster/index.html', 'wb') as file:
    file.write(soup.prettify('utf-8'))