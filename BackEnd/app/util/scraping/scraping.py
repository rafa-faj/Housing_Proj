from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time
from constants import *
import json
chrome_options = Options()
chrome_options.add_argument('headless')
chrome_options.add_argument("--window-size=500,500")
driver = webdriver.Chrome(ChromeDriverManager().install(),options=chrome_options)
def scrape_irvine():
    final_info = {}
    for name,link in scrape_maps.items():
        driver.get(link)
        # get the buttons for available housing
        available_house_buttons = driver.find_elements_by_xpath('//button[@class="btn-circular-with-icon fapt-fp-list-item__acc-trigger-cta"]')
        listings_info = []
        # click them to get info
        for button in available_house_buttons:
            driver.execute_script("arguments[0].click();", button)
        available_type_xpath = '//div[contains(@class,"fapt-fp-list-item fapt-fp-list-item--expanded fapt-fp-list-item--can-expand fapt-fp-list-item--desk-hide-table-content")]'
        available_types = driver.find_elements_by_xpath(available_type_xpath)
        time.sleep(0.5)
        for idx,avail_type in enumerate(available_types):
            image_links = [img.get_attribute("src") for img in avail_type.find_elements_by_xpath('.//img[contains(@class,"fapt-fp-image fapt-fp-list-item__fp-image adaptive-image__elm")]')]
            table_row_xpath = './/div[contains(@class,"fapt-fp-unit fapt-fp-unit__table-row")]'
            for res in avail_type.find_elements_by_xpath(table_row_xpath):
                raw_info = res.text.split('\n')
                if raw_info[0] == "REMODELED":raw_info = raw_info[1:]
                room_types = raw_info[1].split("/")
                rent_term = raw_info[2].split("/")
                current_entry = {
                 "roomType":"|".join(room_types),
                 "availability":raw_info[3].split(" ")[1].strip(),
                 "rent":rent_term[0].strip(),
                 "leaseTerm":rent_term[1].strip(),
                 "images":image_links,
                 "icon":icon_map[name],
                 "distance":distance_map[name]
                  }
                listings_info.append(current_entry)
        # reset by closing the opened sections
        for button in available_house_buttons:
            driver.execute_script("arguments[0].click();", button)
        final_info[name] = listings_info
    return final_info
def scrape_blue():
    def expand_links():
        available_links = driver.find_elements_by_xpath('//a[@data-parent="#collapse-floorplansLink"]')
        # expand all links
        for button in available_links[1:]:
            driver.execute_script("arguments[0].click();", button)
    def get_available_buttons(): 
        all_buttons = driver.find_elements_by_xpath('//button')
        available_buttons = []
        for b in all_buttons:
            if b.text.strip() == "Availability":
                available_buttons.append(b)
        return available_buttons
    def get_room_type():
        all_tables = driver.find_elements_by_xpath('//table[@class="table"]')
        room_types = []
        for t in all_tables:
            if t.text.strip():
                info_array = t.text.split("\n")
                if info_array[-1].strip() == "Availability":
                    beds = info_array[0].split(" ")
                    baths = info_array[1].split(" ")
                    room_types.append(" | ".join([beds[1].strip()+" "+beds[0].strip(),baths[1].strip()+" "+baths[0].strip()]))
        return room_types
    driver.get(la_jolla_blue)
    expand_links()
    room_types = get_room_type()
    available_buttons = get_available_buttons()
    listings_info = []
    inner_elems = driver.find_elements_by_xpath('//div[@class="accordion-inner"]')
    image_links = [[img.get_attribute("data-src") for img in ie.find_elements_by_xpath('.//img')] for ie in inner_elems if ie.find_element_by_xpath('.//table[@class="table"]').text.split("\n")[-1] == "Availability"]
    for i in range(len(available_buttons)):
        if i > 0 :
            available_buttons = get_available_buttons()
        driver.execute_script("arguments[0].click();", available_buttons[i])
        available_units = driver.find_elements_by_xpath('//tr[@class="AvailUnitRow"]')
        for unit in available_units:
            info_array = unit.text.split(" ")
            current_entry = {
             "roomType":room_types[i],
             "availability":info_array[3].strip(),
             "rent":info_array[2].strip(),
             "leaseTerm":'12 Months',
             "images":image_links[i],
             "icon":icon_map["La Jolla Blue"],
             "distance":distance_map["La Jolla Blue"]}
            listings_info.append(current_entry)
        driver.execute_script("window.history.go(-2)")
        expand_links()
    return {"La Jolla Blue":listings_info}
def scrape_images_gardens():
    images_map = {}
    for key,value in garden_scrape_imgs_maps.items():
        driver.get(value)
        inner_car = driver.find_elements_by_xpath('//div[contains(@class,"carousel-inner")]')
        available_imgs = inner_car[0].find_elements_by_xpath('.//div[contains(@class,"item")]')
        image_links = [item.get_attribute("data-bg-img") for item in available_imgs]
        images_map[key] = image_links[:5]
    return images_map
def scrape_gardens():
    final_info = {}
    garden_images = scrape_images_gardens()
    for name, value in garden_scrape_maps.items():
        driver.get(value)
        available_results = driver.find_elements_by_xpath('//div[contains(@class,"floor_plan")]')
        listings = []
        for res in available_results:
            inside_units = res.find_elements_by_xpath('.//tr[contains(@class,"unit_display")]')
            info_array = res.text.split("\n")
            # if it is not an add-on
            if "Lease Add-On" not in info_array[0]:
                room_types = info_array[1].split(",")[:2]
                for unit in inside_units:
                    unit_data = unit.text.split(" ")
                    try:
                        price_data = unit_data[1:3]
                        rent = price_data[0].strip()
                        deposit = price_data[1].split("\n")[0].strip()
                    except:
                        price_data = unit_data[0:2]
                        rent = price_data[0].strip()
                        deposit = price_data[1].split("\n")[0].strip()
                    current_entry = {
                     "roomType":" | ".join([room_types[0].strip()[0]+" Bed",room_types[1].strip()[0]+" Bath"] ),
                     "availability":unit_data[-1].split("\n")[-1].strip(),
                     "rent":rent,
                     "deposit":deposit,
                     "leaseTerm":'Please contact property for available lease terms',
                     "images":garden_images[name],
                     "icon":icon_map[name],
                     "distance":distance_map[name]}
                    listings.append(current_entry)
        final_info[name] = listings
    return final_info

def scrape_total():
    irvine_comp_info = scrape_irvine()
    blue_info = scrape_blue()
    garden_info = scrape_gardens()
    final_info = irvine_comp_info
    final_info.update(blue_info)
    final_info.update(garden_info)
    with open('applications_details.json') as f:
        app_info = json.load(f)
    landlord_rooms = []
    for key,application_details in app_info.items():
        for room in final_info[key]:
            room_data = {"name":key}
            room_data.update(application_details)
            room_data.update(room)
            landlord_rooms.append(room_data)
    return landlord_rooms
if __name__ == "__main__":
    landlord_rooms = scrape_total()
    print(landlord_rooms)