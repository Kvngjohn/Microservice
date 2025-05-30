- name: Check index.js exists and is valid
    run: |
        test -f ./src/routes/index.js
        node -c ./src/routes/index.js
