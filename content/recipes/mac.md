---
title: Mac n cheese
date: 2023-05-21T12:30:18-04:00
draft: false
layout: recipe
recipe:
  servings: 6
  ingredients:
    - group: Main
      items:
        - name: pasta
          amount: 0.5 lb
        - name: thick bacon
          amount: 3 slices
        - name: shrimp
          amount: 0.5 lb
          instruction: size 26-30/lb
    - group: Breadcrumbs
      items:
        - name: panko
          amount: 1 cup
        - name: parmesan
          amount: 0.5 cup
        - name: butter
          amount: 2 tbsp
    - group: Cheese Sauce
      items:
        - name: melty cheese
          amount: 11 oz
        - name: milk
          amount: 2 cups
        - name: butter
          amount: 2 tbsp
        - name: flour
          amount: 2 tbsp
        - name: sodium citrate
          amount: 2 tsp
  instructions:
    - 'Preheat oven to 350 F'
    - 'Cook bacon and shrimp; wash pan'
    - 'Make breadcrumbs; wash pan'
    - 'Cheese sauce: make lightly browned roux. Add all the cold milk and
    sodium citrate and bring to a light simmer. Add melty cheese.'
    - 'Boil macaroni for 4 minutes.'
    - 'Combine ingredients and bake.'
  gantt:
    - id: preheat_350F
      start: 0
      duration: 45m
      dependsOn:
    - id: bacon
      start:
      duration: 20m
      end:
      dependsOn:
    - id: shrimp
      desc:
      start:
      duration: 10m
      end:
      dependsOn: bacon
    - id: breadcrumbs
      desc:
      start:
      duration: 10m
      end:
      dependsOn: shrimp
    - id: cheese
      desc:
      start:
      duration: 20m
      end:
      dependsOn: breadcrumbs
    - id: water
      start:
      duration: 15m
      end: pasta.start
      dependsOn:
    - id: pasta
      desc:
      start:
      duration: 4m
      end: cheese.end
      dependsOn:
    - id: combine_n_bake
      desc:
      start:
      duration: 20m
      end:
      dependsOn: cheese
---
