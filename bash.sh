#!/bin/bash

git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "saadh393@gmail.com" ]
then
    export GIT_COMMITTER_NAME="raihanhasan"
    export GIT_COMMITTER_EMAIL="your.email@publicdomain.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "saadh393@gmail.com" ]
then
    export GIT_AUTHOR_NAME="raihanhasan"
    export GIT_AUTHOR_EMAIL="your.email@publicdomain.com"
fi

if [ "$GIT_COMMITTER_EMAIL" = "your.email@susickjoarder@gmail.com" ]
then
    export GIT_COMMITTER_NAME="raihanhasan"
    export GIT_COMMITTER_EMAIL="your.email@publicdomain.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "your.email@susickjoarder@gmail.com" ]
then
    export GIT_AUTHOR_NAME="raihanhasan"
    export GIT_AUTHOR_EMAIL="your.email@publicdomain.com"
fi
' --tag-name-filter cat -- --branches --tags
