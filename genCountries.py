import os

def findVarsInFiles(filePath, object, matches):
        with open(filePath) as file:
            for line in file.readlines():
                for match in matches:
                    ifFoundSet(country, match, line) 
    
def ifFoundSet(object, match, line):
    if match in line:
        values = line.split("'")
        object[match] = values[1]


def deleteIfExists(fileName):
    if (os.path.isfile(fileName)):
        os.remove(fileName)


countriesFilePath = "./static/countries.json"
basePath = "./app/countrySpecific/"

#delete the file if it exists so we can start fresh
deleteIfExists(countriesFilePath)

for (_, dirnames, _) in os.walk(basePath):
    countries = {}
    file = open(countriesFilePath, "a")
    file.write("[")
    file.close()
    index = 0
    for dir in dirnames:
        country = {}
        
        config = basePath+dir+"/config.ts" 
        findVarsInFiles(config, country, ["BASE_URL", "COUNTRY_CODE", "MAP_CENTER"])
        textVariables = basePath+dir+"/text-variables.ts"
        findVarsInFiles(textVariables, country, ["COUNTRY_NAME"])
        
        file = open(countriesFilePath, "a")
        file.write(str(country).replace("'",'"')+",")
        file.close()
    
    #remove trailing commma
    file = open(countriesFilePath, "r")
    lines = file.read()
    lines = lines[:-1]
    file.close()
    file = open(countriesFilePath, "w")
    file.write(lines+"]")
    file.close()
    break

