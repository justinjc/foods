---
title: 'Avgolemono Soup'
date: 2023-06-02T23:39:31-04:00
draft: false
layout: recipe
recipe:
  servings: 4
  ingredients:
    - group: Bits
      items:
        - name: carrot
          amount: 1 cup
        - name: celery
          amount: 1 cup
        - name: onion
          amount: 1 cup
        - name: garlic cloves
          amount: 4
        - name: orzo
          amount: 100g
        - name: chicken breasts
          amount: 2
          instruction: cooked
    - group: Soup
      items:
        - name: water
          amount: 4 cup
          instruction: to start
        - name: better than bouillon
          amount: 1 tbsp
        - name: eggs
          amount: 2
        - name: lemon juice
          amount: 60 ml
          instruction: to start
  instructions:
    - 'Cook carrot, celery, onion with olive oil.'
    - 'Shred chicken and add chicken stock.'
    - 'Cook orzo a few minutes before al dente.'
    - 'Mix eggs and lemon juice. Temper by adding a few ladles of soup in
      while beating eggs. Slowly add egg mixture in soup slowly from stirring.
      Bring back to a simmer.'
    - 'Add shredded chicken.'
  gantt:
    - id: carrot_celery_onion_garlic
      start: 0
      duration: 30m
      dependsOn:
    - id: shred_chicken
      start: 0
      duration: 10m
    - id: chicken_stock
      duration: 30m
      dependsOn: carrot_celery_onion_garlic
    - id: orzo
      duration: 10m
      dependsOn: chicken_stock
    - id: add_eggs_lemon_mix
      duration: 20m
      end:
      dependsOn: orzo
    - id: chicken
      duration: 10m
      end:
      dependsOn: add_eggs_lemon_mix
---
