import os
from selenium import webdriver
executable_path = os.path.dirname(os.path.abspath(__file__)) + "/chromedriver"
driver = webdriver.Chrome(executable_path)
driver.get("https://www.google.com/search?q=hotel+meaning&rlz=1C5CHFA_enIN845IN846&oq=hotel+meaning&aqs=chrome..69i57j0l5.1863j1j7&sourceid=chrome&ie=UTF-8")
html_source = driver.page_source
#print(type(html_source))



count = 0  
string = "xhf7k"
index = 0 
for i in range(0,len(html_source)):
	if string[0]==html_source[i] and string[1]==html_source[i+1] and string[2]==html_source[i+2] and string[3]==html_source[i+3] and string[4]==html_source[i+4] :
		count = count+1
		if count == 2:
			index = i
index = index + 30
searched_word = ""
while html_source[index] != '<' :
	searched_word += html_source[index]
	index = index + 1
print ("Searched Word : " + searched_word)


count = 0 
string = "dfn"
for i in range(0,len(html_source)):
	if string[0]==html_source[i] and string[1]==html_source[i+1] and string[2]==html_source[i+2] :
		count = count + 1
		if count ==  1 :
			index = i
index = index + 11
meaning = ""
while html_source[index] != '<' :
	meaning += html_source[index]
	index = index + 1
print("Meaning : "+ meaning)

file = open("/Users/adityaatri/Desktop/dictionary.txt","a")
file.write(f'{searched_word} :  {meaning} \n')
file.close()









