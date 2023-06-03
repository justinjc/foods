---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
layout: recipe
recipe:
  servings: 6
  ingredients:
    - group: Main
      items:
        - name: flour
          amount: 1 cup
          instruction:
  instructions:
    - 'Cook'
  gantt:
    - id: cook
      start: 0
      duration: 30m
      dependsOn:
---
