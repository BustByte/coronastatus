import os

def findStringVarsInFiles(filePath, obj, matches):
        with open(filePath) as file:
            for line in file.readlines():
                for match in matches:
                    if match in line:
                        values = line.split("'")
                        obj[match] = values[1]
                    
def findFloatVarsInFiles(filePath, obj, matches):
        with open(filePath) as file:
            for line in file.readlines():
                for match in matches:
                    if match in line:
                        print("found match", match)
                        parts = line.split(":")
                        parts = parts[1]
                        value = parts.split(",")
                        country[match] = value[0].rstrip()


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
        findStringVarsInFiles(config, country, ["BASE_URL", "COUNTRY_CODE"])
        findFloatVarsInFiles(config, country, ["lat", "lon"])
        textVariables = basePath+dir+"/text-variables.ts"
        findStringVarsInFiles(textVariables, country, ["COUNTRY_NAME"])
        
        file = open(countriesFilePath, "a")
        print(country)
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

