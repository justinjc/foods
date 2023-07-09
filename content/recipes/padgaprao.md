---
title: 'Pad Gaprao'
date: 2023-07-09T12:29:59-04:00
draft: false
layout: recipe
recipe:
  source: https://www.allrecipes.com/recipe/257938/spicy-thai-basil-chicken-pad-krapow-gai/
  servings: 3
  ingredients:
    - group: Sauce
      items:
        - name: chicken broth
          amount: 0.33 cup
        - name: oyster sauce
          amount: 1 tbsp
        - name: fish sauce
          amount: 2 tsp
        - name: white sugar
          amount: 1 tsp
        - name: brown sugar
          amount: 1 tsp
    - group: Main
      items:
        - name: chicken or pork
          amount: 1 lb
          instruction: ground
        - name: hot pepper
          amount: 2 tbsp
          instruction: minced
        - name: shallot
          amount: 1
          instruction: sliced
        - name: garlic
          amount: 5 cloves
          instruction: minced
        - name: basil
          amount: 1 oz
          instruction: sliced
  instructions:
    - 'Combine ingredients for sauce.'
    - 'Sear meat untouched for 2 minutes.'
    - 'Add garlic and shallot and mix. Gradually add in pepper to desired heat level. Cook for 5 minutes.'
    - 'Add in sauce 1 tbsp at a time, waiting for the most of it to evaporate before adding the next tbsp.'
    - 'Stir in basil.'
  gantt:
    - id: sear_meat
      start: 0
      duration: 2m
      end:
      dependsOn:
    - id: make_sauce
      start: 0
      duration: 5m
      end:
      dependsOn:
    - id: garlic_shallot_pepper
      start: 0
      duration: 8m
      end:
      dependsOn: sear_meat
    - id: sauce
      start: 0
      duration: 8m
      end:
      dependsOn: garlic_shallot_pepper
    - id: basil
      start: 0
      duration: 1m
      end:
      dependsOn: sauce
---
