---
title: 'Potato Sticks'
date: 2023-07-09T12:47:19-04:00
draft: false
layout: recipe
recipe:
  source: https://www.youtube.com/watch?v=BP0YLGKxC4U
  servings: 2
  ingredients:
    - group: Main
      items:
        - name: potato
          amount: 500g
          instruction: cut in chunks
        - name: corn starch
          amount: 100g
          instruction:
        - name: sugar
          amount: 15g
          instruction:
        - name: salt
          amount: 0.125 tsp
          instruction:
  instructions:
    - 'Boil potatos and mash.'
    - 'Add in the rest of the ingredients and mix.'
    - 'Shape into a rectangular shape in a sandwich bag and put in the fridge for at least 30 minutes.'
    - 'Remove from bag and cut into stick shapes.'
    - 'Fry in 325F oil for 5-7 minutes until golden brown.'
  gantt:
    - id: mash_potato
      start: 0
      duration: 30m
      end:
      dependsOn:
    - id: mix
      start: 0
      duration: 5m
      end:
      dependsOn: mash_potato
    - id: cool
      start: 0
      duration: 30m
      end:
      dependsOn: mix
    - id: cut
      start: 0
      duration: 5m
      end:
      dependsOn: cool
    - id: fry
      start: 0
      duration: 15m
      end:
      dependsOn: cut
---
