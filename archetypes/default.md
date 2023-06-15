---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
layout: recipe
recipe:
  source: https://www.example.com/
  servings: 4
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
      end:
      dependsOn:
---
