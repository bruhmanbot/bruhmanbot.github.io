
file = open('col.txt', "r")
content:str = file.read()
file.close()
split: list[str] = content.split('\t')

splitq = []
for q in split:
    splitq.append(round(float(q),3))

# endDict = {}
# for q in split:
#     further_split = q.split('\t')
#     endDict[str(further_split[0])] = int(further_split[1])
    
file = open('col2.txt', "w")
file.write(str(splitq))

file.close()