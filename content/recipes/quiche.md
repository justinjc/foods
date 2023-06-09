---
title: 'Quiche'
date: 2023-06-03T00:14:02-04:00
draft: false
layout: recipe
recipe:
  servings: 2
  ingredients:
    - group: Main
      items:
        - name: eggs
          amount: 5
        - name: milk and/or cream
          amount: 1.25 cup
        - name: 9" pie crust
          amount: 1
        - name: extra thick bacon
          amount: 3 slices
        - name: spinach
          amount: 6 oz
        - name: cheese
          amount: 3 oz
  instructions:
    - 'Blind bake crust.'
    - 'Cook bacon and spinach. Shred cheese.'
    - 'Wring spinach dry (towel) and cut to small pieces.'
    - 'Beat eggs and mix with milk/cream. Add one pinch of salt and pepper.'
    - 'Layer cheese/bacon/spinach in blind baked crust.'
    - 'Add egg/milk/cream and bake at 350F for ~40m.'
  gantt:
    - id: blind_bake
      start: 0
      duration: 45m
      end:
      dependsOn:
    - id: shred_cheese
      start: 0
      duration: 20m
      end:
      dependsOn:
    - id: bacon
      start: 0
      duration: 20m
      end:
      dependsOn: shred_cheese
    - id: clean_n_cook_spinach
      start: 0
      duration: 30m
      end:
      dependsOn:
    - id: combine_n_fill
      start: 0
      duration: 20m
      end:
      dependsOn: bacon clean_n_cook_spinach blind_bake
    - id: bake_350F
      start: 0
      duration: 45m
      end:
      dependsOn: combine_n_fill
---
