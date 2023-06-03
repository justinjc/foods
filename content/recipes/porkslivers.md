---
title: 'Pork Slivers'
date: 2023-06-03T00:38:15-04:00
draft: false
layout: recipe
recipe:
  source: https://www.youtube.com/watch?v=6I55Yf_ThSg&t=73s
  servings: 4
  ingredients:
    - group: Pork sliver marinade
      items:
        - name: salt
          amount: 0.5 tsp
        - name: sugar
          amount: 1 tsp
        - name: cornstarch
          amount: 1 tsp
        - name: shaoxing wine
          amount: 1 tbsp
        - name: dark soy sauce
          amount: 0.5 tsp
    - group: Main
      items:
        - name: pork
          amount: 1 lb
          instruction: in slivers
        - name: Chinese leek
          amount: 8 stalks
          instruction: green/white separated
        - name: Laoganma pickled chili
          amount: 5 tbsp
        - name: garlic
          amount: 5 cloves
          instruction: minced
        - name: ginger
          amount: 1"
          instruction: minced
        - name: shaoxing wine
          amount: 1 tbsp
        - name: MSG
          amount: 0.5 tsp
        - name: dark Chinese vinegar
          amount: 1 tsp
        - name: white pepper
          amount: 0.5 tsp
  instructions:
    - 'Marinade pork. Mince chili, garlic, and ginger.'
    - 'Cook pork slivers and reserve.'
    - 'Cook chili until oil is red. Add garlic and ginger and cook for 5m.
      Add 1 tbsp shaoxing wine and white part of leeks and cook for another 5m.'
    - 'Add cooked pork and green part of leeks. Mix.'
    - 'Add vinegar, MSG, and pepper.'
  gantt:
    - id: marinade
      duration: 10m
    - id: pork_n_remove
      duration: 5m
      dependsOn: marinade
    - id: prep_chili_garlic_ginger
      duration: 10m
      dependsOn:
    - id: chili,_garlic,_ginger,_white_leek
      duration: 10m
      dependsOn: pork_n_remove
    - id: add_pork_n_green_leek
      duration: 10m
      dependsOn: chili,_garlic,_ginger,_white_leek
---
