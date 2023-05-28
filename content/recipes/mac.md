---
title: Mac n cheese
date: 2023-05-21T12:30:18-04:00
draft: false
layout: recipes
recipe:
  servings: 6
  ingredients:
    - name: thingy
      num: 1 lb
    - name: bobby
      num: 2.5 cups
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
      duration: 5m
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
      desc:
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
