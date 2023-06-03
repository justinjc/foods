---
title: 'Short Ribs'
date: 2023-06-03T17:31:04-04:00
draft: false
layout: recipe
recipe:
  servings: 4
  ingredients:
    - group: Bits
      items:
        - name: short ribs
          amount: 2 lb
        - name: onion
          amount: 1
          instruction: diced
        - name: carrots
          amount: 2
          instruction: diced
        - name: celery
          amount: 1 stalk
          instruction: diced
        - name: dried shiitake
          amount: 6
          instruction: rehydrated and sliced
    - group: Others
      items:
        - name: flour
          amount: 1 tbsp
        - name: tomato paste
          amount: 2 tsp
        - name: red wine
          amount: 300 ml
        - name: better than bouillon beef
          amount: 1 tsp
    - group: Herbs
      items:
        - name: garlic
          amount: 0.5 head
        - name: parsley
          amount: 4 sprigs
        - name: thyme
          amount: 3 sprigs
        - name: rosemary
          amount: 1 sprigs
        - name: oregano
          amount: 2 sprigs
        - name: bay leaf
          amount: 1
  instructions:
    - 'Sear shorb ribs on all sides, then reserve.'
    - 'Cook onion, carrot, celery for 10 minutes. Add garlic and cook for
      another 2 minutes.'
    - 'Mix in tomato paste, then mix in flour. Cook for 1 minute.'
    - 'Add better than bouillon beef and red wine and reduce by 50%.'
    - 'Place short ribs bone-side down and enough water to nearly cover the beef,
      then add in the rest of the herbs.'
    - 'Cook for 3 hours in the oven at 350F.'
  gantt:
    - id: sear_short_ribs
      start: 0
      duration: 10m
      dependsOn:
    - id: preheat_350F
      start: 0
      duration: 45m
      end:
    - id: onion_carrot_celery
      duration: 15m
      dependsOn: sear_short_ribs
    - id: tomato_paste,_flour
      duration: 10m
      dependsOn: onion_carrot_celery
    - id: red_wine
      duration: 15m
      dependsOn: tomato_paste,_flour
    - id: combine_n_oven
      duration: 30m
      dependsOn: red_wine preheat_350F
---
