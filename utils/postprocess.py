
import os
from bs4 import BeautifulSoup, Doctype

with open('dist/Poster/index.html', 'r') as file:
    soup = BeautifulSoup(file, 'html5lib')

# remove <!DOCTYPE html>
for item in soup.contents:
    if isinstance(item, Doctype):
        item.extract()

with open('dist/index.bundle.js', 'r') as file:
    script_file = file.read()

# embed JS in HTML
script_tag = soup.find('script')
script_tag.string = script_file
del script_tag.attrs['src']

with open('dist/Poster/index.html', 'wb') as file:
    file.write(b'{{ Poster }}\n\n')
    file.write(soup.prettify('utf-8'))

os.remove('dist/index.bundle.js')