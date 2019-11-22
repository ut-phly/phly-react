import csv
# download text list from https://www.irs.gov/charities-non-profits/tax-exempt-organization-search-bulk-data-downloads
# put it into a csv file
np_long =  open("C:\\Users\\stara\\phly-react\\public\\nonprofits\\data-download-pub78.txt")
line = np_long.readline()

with open ('nonprofit.csv', mode='w') as file:
    while line:
        start = line.find("|") + 1
        end = line.find("|", start)
        file.write(line[start:end])
        file.write('\n')
        line = np_long.readline()

np_long.close()
