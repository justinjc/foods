---
title: 'Pork Diablo'
date: 2023-06-14T23:36:03-04:00
draft: false
layout: recipe
recipe:
  source: https://www.allrecipes.com/recipe/222187/pork-tenderloin-diablo/
  servings: 2
  ingredients:
    - group: Main
      items:
        - name: pork tenderloin
          amount: 11 oz
        - name: mushrooms
          amount: 8 oz
          instruction: sliced
        - name: onions
          amount: 0.5
          instruction: sliced
    - group: Sauce
      items:
        - name: chicken broth
          amount: 0.5 cup
        - name: dijon mustard
          amount: 1 tbsp
        - name: horseradish
          amount: 1.5 tbsp
        - name: heavy cream
          amount: 2 tbsp
        - name: butter
          amount: 1.5 tbsp
  instructions:
    - 'Cook mushrooms and onions. Reserve.'
    - 'Sear pork tenderloin on all sides. Cook and finish in oven until internal temp of 135F
      and let it rest.'
    - 'Add chicken broth, dijon, and horseradish. Stir and simmer for 1 minute. Add heavy cream
      and butter and reduce to desired consistency.'
  gantt:
    - id: mushrooms_n_onions
      duration: 20m
    - id: pork
      duration: 20m
      end:
      dependsOn: mushrooms_n_onions
    - id: sauce
      duration: 10m
      end:
      dependsOn: pork
---
