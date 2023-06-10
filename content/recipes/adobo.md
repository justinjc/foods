---
title: 'Adobo'
date: 2023-06-10T17:50:23-04:00
draft: false
layout: recipe
recipe:
  servings: 4
  ingredients:
    - group: Main
      items:
        - name: pork
          amount: 1 lb
          instruction: 1.25" chunks
        - name: garlic
          amount: 4 cloves
        - name: water
          amount: 1 cup
        - name: cane  vinegar
          amount: 0.25 cup
          instruction: to start
        - name: soy sauce
          amount: 2 tbsp
          instruction: to start
        - name: bay leaf
          amount: 1
        - name: sugar
          amount: 1 tsp
        - name: whole black peppercorn
          amount: 2 tsp
  instructions:
    - 'Salt and pepper pork. Sear pork on all sides.'
    - 'Add garlic and cook for 2 minutes.'
    - 'Add water, then soy sauce and vinegar and stir.'
    - 'Add bay leaf, sugar, and peppercorns.'
    - 'Cook for 1.5 hours covered and check for tenderness every 15 minutes.'
    - 'When nearly tender, open lid to reduce sauce. Reserve pork first if getting too soft.'
  gantt:
    - id: sear_pork
      start: 0
      duration: 10m
      end:
      dependsOn:
    - id: garlic
      start: 0
      duration: 5m
      end:
      dependsOn: sear_pork
    - id: everything_else
      start: 0
      duration: 1h
      end:
      dependsOn: garlic
---
