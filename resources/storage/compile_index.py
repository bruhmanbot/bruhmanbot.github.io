import os
import json
import shutil

def fileType(filename:str) -> str:
    # Return only the file type e.g. .pdf
    fileInfo: list[str] = filename.split('.')
    return fileInfo[-1]
    
def getInfo(filename: str) -> tuple[str]:
    # Return name, filetype, topic in a list e.g. ["file1", "txt", "EM"]
    fileMeta = filename.split('_')
    
    if len(fileMeta) != 2:
        print(f'{filename} is not formatted correctly, please check again!')
        quit()
        
    topic = fileMeta[0]
    name, fileType = fileMeta[1].split('.')
    
    return topic, name, fileType

def replace(opStr:str, strOut: str, strIn:str) -> str:
    # Does a CTRL H on the string
    if strOut not in opStr:
        return opStr
    
    index:int = opStr.index(strOut)
    remainingString: str = opStr[index+len(strOut):]
    newString: str = opStr[0:index] + strIn + replace(remainingString, strOut, strIn)
    
    return newString

def cleanFileNames() -> None:
    # Cleans up the file names by replacing the spaces with hyphens
    files: list[str] = os.listdir()
    for f in files:
        # f is a file name
        os.rename(f, replace(f, ' ', '-'))
        
    return

def check_filenameFormatting(ignoreFileTypes=['py', 'json', 'txt']) -> list[str]:
    # Sees if all files are formatted correctly and returns the list of the files that aren't
    files = os.listdir()
    wrongList: list[str] = []
    
    for f in files:
        if fileType(f) in ignoreFileTypes:
            continue
        fileMeta = f.split('_')
        if len(fileMeta) != 2:
            wrongList.append(f)
            
    if wrongList:
        print (f'These files are not correctly formatted:\n{wrongList}')
        return wrongList
    
    # Normal procedure
    return wrongList
            

def genIndexFile(linkTemplate, PREFIX, ignoreFileTypes=['py', 'json', 'txt']):
    global blacklist
    indexfile: dict[str, dict] = {}
    files: list[str] = os.listdir()

    # Exclude the .py file and .json files
    fileIsNotUtilityFile = lambda file: file.split('.') [-1] not in ignoreFileTypes
    filesFiltered = list(filter(fileIsNotUtilityFile, files))

    # First part of the link

    for num, f in enumerate(filesFiltered):
        topic, fileName, fileType = getInfo(f)
        fileID = PREFIX + '-' + str(num)

        # We replace the hyphens with spaces for displaying
        indexfile[fileID] = {
        "name": replace(fileName,'-',' '),
        "type": fileType,
        "link": linkTemplate + f,
        "topic": replace(topic,'-',' ')
    }
    
    outputIndex = json.dumps(indexfile)

    outputFile = open('fileinfo.json', "w")
    outputFile.write(outputIndex)
    outputFile.close()
    
    return

def cutAndPasteTO(destination: str) -> None:
    # Cut and paste the generated fileInfo.json into the correct directory
    # e.g. physics file go to /resources/phys/fileinfo.json
    PATH = f'../../{destination}/'
    shutil.copy2('fileinfo.json', PATH)
    return

def commitJSON(subject):
    # cd's into the subject folder, and compiles the index JSON file of the files inside
    # Pastes the output index JSON file in the /resources/{subject}/ directory
    os.chdir(subject)
    linkTemplate: str = f"/resources/storage/{subject}/"
    # Clean up by replacing all spaces with hyphens
    cleanFileNames()
    
    wrongNameFiles = check_filenameFormatting()
    
    if wrongNameFiles:
        quit()
        
    genIndexFile(linkTemplate=linkTemplate, PREFIX=subject)
    cutAndPasteTO(subject)
    # Return back to the /storage directory
    os.chdir('..')
    return

def main() -> int:
    # RUN THIS IN THE /resources/storage/ directory
    subjects: list[str] = os.listdir()
    for s in subjects:
        # Skips any utility file in the /storage directory
        # Only considers sub-directories
        if '.' in s:
            continue
        
        commitJSON(s)
        
    return 0 

if __name__ == '__main__':
    main()
        