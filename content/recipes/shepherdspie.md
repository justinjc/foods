---
title: "Shepherd's Pie"
date: 2023-12-25T10:15:15-05:00
draft: false
layout: recipe
recipe:
  source: https://www.thewholesomedish.com/the-best-classic-shepherds-pie/#recipe
  servings: 4
  ingredients:
    - group: Meat
      items:
        - name: ground beef
          amount: 0.5 lb
        - name: ground lamb
          amount: 0.5 lb
        - name: onion
          amount: 1
          instruction: diced
        - name: carrot
          amount: 1
          instruction: diced
        - name: garlic
          amount: 3 cloves
        - name: thyme
          amount: 1 tsp
        - name: rosemary
          amount: 1 tsp
        - name: flour
          amount: 1 tbsp
        - name: tomato paste
          amount: 2 tbsp
        - name: beef better than bouillon
          amount: 1 tsp
        - name: red wine
          amount: 0.25 cup
        - name: worchestershire sauce
          amount: 1 tbsp
        - name: fresh parsley
          amount: 4 tbsp
        - name: peas
          amount: to taste
          instruction: frozen
    - group: Mash
      items:
        - name: potato
          amount: 2 large or 3 medium
          instruction: 1" cubes
        - name: butter
          amount: 6 tbsp
        - name: parmesan
          amount: to taste
        - name: cream or milk
          amount: to taste
        - name: garlic powder
          amount: 1 tsp
  instructions:
    - 'Take out butter from fridge. Preheat oven at 400F.'
    - 'Brown beef and lamb.'
    - 'Add onion and carrot and cook for 10 minutes.'
    - 'Add garlic and cook for 1 minute.'
    - 'Add flour, tomato paste, better than bouillon, cook for 1 minute, then deglaze with wine. Reduce.'
    - 'Add Worchestershire sauce and add salt and pepper to taste.'
    - 'Boil potatoes for 15 minutes, then add to bowl with the rest of mash ingredients. Add salt to taste.'
    - 'Reheat meat if necessary. Mix in parsley and frozen peas, then put in baking vessel.'
    - 'Add mash on top. Use fork to create texture.'
    - 'Change oven setting to broil and bake until mash is golden brown on top.'
  gantt:
    - id: meat
      start: 0
      duration: 10m
      end:
      dependsOn:
    - id: veggie
      start: 0
      duration: 10m
      end:
      dependsOn: meat
    - id: gravy
      start: 0
      duration: 10m
      end:
      dependsOn: veggie
    - id: mash
      duration: 25m
      end: combine.start
      dependsOn:
    - id: combine
      start: 0
      duration: 5m
      end:
      dependsOn: gravy
    - id: bake
      duration: 20m
      end:
      dependsOn: combine
    - id: preheat
      start: 0
      duration: 30m
      end: bake.start
      dependsOn: gravy
---
