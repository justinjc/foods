---
title: Mac n cheese
date: 2023-05-21T12:30:18-04:00
draft: false
layout: recipes
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
  gantt:
    - id: preheat_350F
      desc: Preheat oven 350F
      start:
      duration: 45m
      end: bake.start
      dependsOn:
    - id: bacon
      desc:
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
      duration: 30m
      end:
      dependsOn: breadcrumbs
    - id: water
      desc: dd
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
    - id: combine
      desc:
      start:
      duration: 5m
      end:
      dependsOn: cheese pasta
    - id: bake
      desc:
      start:
      duration: 20m
      end:
      dependsOn: combine
---
