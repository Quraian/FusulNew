#!/usr/bin/env python3
import json
import ijson
from deep_translator import GoogleTranslator

result = []
with open('saudi-arabia.json', 'w', encoding='utf8') as output_file:
    with open("owm_city_list.json", "rb") as f:
        objects = ijson.items(f, 'RECORDS.item')
        cities = (c for c in objects if c['owm_country'] == 'SA')

        for c in cities:
            cityName = c['owm_city_name']
            city = {
                'name': GoogleTranslator(
                    source='en', target='ar').translate(cityName),
                'nameEn': cityName,
                'lat': float(c['owm_latitude']),
                'lon': float(c['owm_longitude'])
            }
            result.append(city)
    back_json = json.dumps(result, indent=2, ensure_ascii=False)
    output_file.write(back_json)
