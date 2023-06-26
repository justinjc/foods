---
title: 'Stroganoff'
date: 2023-06-26T17:39:30-04:00
draft: false
layout: recipe
recipe:
  source: https://www.spendwithpennies.com/easy-beef-stroganoff/#wprm-recipe-container-149619
  servings: 2
  ingredients:
    - group: Main
      items:
        - name: wide egg noodle
          amount: 120g
        - name: flank steak
          amount: 0.5 lb
          instruction:
        - name: butter
          amount: 1 tbsp
        - name: mushroom
          amount: 0.5 lb
          instruction: thick sliced
        - name: onion
          amount: 0.5
          instruction: sliced
    - group: Sauce
      items:
        - name: flour
          amount: 1.5 tbsp
        - name: garlic
          amount: 1 clove
        - name: beef broth
          amount: 0.5 cup
        - name: dijon mustard
          amount: 1 tsp
        - name: Worcestershire sauce
          amount: 1 tsp
          instruction:
        - name: thyme
          amount: 0.5 tsp
          instruction:
        - name: sour cream
          amount: 0.25 cup
          instruction: to taste
  instructions:
    - 'Slice beef into thin strips.'
    - 'Velvet beef: mix one cup water with 2 tsp baking soda and put beef in
      for 10 minutes.'
    - 'Drain beef and pat dry. Lightly season with salt and pepper.'
    - 'Sear beef and reserve.'
    - 'Cook onion and mushrooms in butter. Add garlic and cooka couple minutes.'
    - 'Add flour and mix until well combined, then add rest of ingredients
      except for sour cream.'
    - 'Cook and reduce to desired consistency, then add sour cream to taste.'
    - 'Mix with cooked egg noodles and beef.'
  gantt:
    - id: beef
      start: 0
      duration: 10m
      end:
      dependsOn:
    - id: mushroom_n_onion
      start: 0
      duration: 20m
      end:
      dependsOn: beef
    - id: sauce
      start: 0
      duration: 20m
      end:
      dependsOn: mushroom_n_onion
    - id: water
      duration: 20m
      end: egg_noodle.start
    - id: egg_noodle
      duration: 10m
      end: combine.start
      dependsOn: beef
    - id: combine
      duration: 5m
      end:
      dependsOn: sauce
---
