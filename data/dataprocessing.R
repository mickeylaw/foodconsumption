library(ggplot2)
library(dplyr)
library(ggthemes)
library(formattable)
library(treemapify)
library(tidyr)
library(ggmosaic)
library(tibble)


SEP <- "\t"
SEP2 <- ","

R_DATA_GENERAL <<- "/Users/howinglaw/Desktop/Project/foodconsumption.github.io/data/"

##############################################################################################################
# LOAD DATA
##############################################################################################################

message("loading data...")

# full suicide case data
foodConsume <- read.table(paste(R_DATA_GENERAL, "foodconsumption.csv", sep=""), quote="\"", header=T, comment.char="", sep=SEP2)
head(foodConsume)

##############################################################################################################
# BASIC ANALYSIS AND VISUALIZATION
##############################################################################################################

message("RQ1: What is the most common form of suicide?")

plot_data2 <- foodConsume %>%
  filter(FoodexL1=="Grains and grain-based products") %>%
  dplyr::count(Country, PopClass) 

plot_data2

grain_data <- foodConsume %>%
  filter(FoodexL1=="Grains and grain-based products", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

grain_data$Mean <- as.numeric(as.character(grain_data$Mean))

grain_data <- grain_data %>%
  dplyr::mutate(Mean = round(Mean, 0)) 

grain_data

write.csv(grain_data, 'grain.csv')

starchy_data <- foodConsume %>%
  filter(FoodexL1=="Starchy roots and tubers", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

starchy_data$Mean <- as.numeric(as.character(starchy_data$Mean))

starchy_data <- starchy_data %>%
  dplyr::mutate(Mean = round(Mean, 0)) 

starchy_data

write.csv(starchy_data, 'starchy.csv')











starch_data <- full_join(grain_data, starchy_data, by = 'Country')
starch_data <- starch_data %>% 
  dplyr::mutate(Mean = sum(Mean.x, Mean.y)) %>%
  select(Country, Mean)%>%
  dplyr::mutate(Mean = round(Mean, 0))%>%
  add_column(FoodexL1 = "Carbohydrates", .before = "Mean")
starch_data

starch_data$FoodexL1 <- as.factor(starch_data$FoodexL1)

starch_data

write.csv(starch_data, 'starchAll.csv')

fruit_data <- foodConsume %>%
  filter(FoodexL1=="Fruit and fruit products", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

fruit_data$Mean <- as.numeric(as.character(fruit_data$Mean))

fruit_data <- fruit_data%>%
  dplyr::mutate(Mean = round(Mean, 0))

fruit_data

write.csv(fruit_data, 'fruit.csv')





total <- rbind(fruit_data , starch_data)
total %>% group_by(Country)

write.csv(total, 'total.csv')



austria_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Grains and grain-based products",
                         "Starchy roots and tubers",
                         "Vegetables and vegetable products (including fungi",
                         "Legumes, nuts and oilseeds",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Eggs and egg products",
                         "Meat and meat products (including edible offal)",
                         "Fish and other seafood (including amphibians, rept)",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Austria") %>%
  select(Country,FoodexL1, Mean)

austria_data$Mean <- as.numeric(as.character(austria_data$Mean))
austria_data$FoodexL1 <- as.character(austria_data$FoodexL1)

austria_data <- austria_data%>%
  dplyr::mutate(Mean = round(Mean, 0))

austria_data$FoodexL1[austria_data$FoodexL1 %in% oldCarb] <- "Carbohydrates"
austria_data$FoodexL1[austria_data$FoodexL1 %in% oldMeat] <- "Meats"
austria_data$FoodexL1[austria_data$FoodexL1 %in% oldVeg] <- "Vegetables"

austria_data<- austria_data%>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean))
austria_data






foodConsume <- read.table(paste(R_DATA_GENERAL, "foodconsumption.csv", sep=""), quote="\"", header=T, comment.char="", sep=SEP2)
head(foodConsume)


oldMeat <- c("Eggs and egg products" , "Meat and meat products (including edible offal)" , "Fish and other seafood (including amphibians, rept")
oldCarb <- c("Grains and grain-based products" , "Starchy roots and tubers")
oldVeg <- c("Vegetables and vegetable products (including fungi" , "Legumes, nuts and oilseeds")

foodConsume$FoodexL1 <- as.character(foodConsume$FoodexL1)
foodConsume$FoodexL1[foodConsume$FoodexL1 %in% oldCarb] <- "Carbohydrates"
foodConsume$FoodexL1[foodConsume$FoodexL1 %in% oldMeat] <- "Meats"
foodConsume$FoodexL1[foodConsume$FoodexL1 %in% oldVeg] <- "Vegetables"

head(foodConsume)

foodConsume$Mean <- as.numeric(as.character(foodConsume$Mean))
foodConsume$Median <- as.numeric(as.character(foodConsume$Median))



message("1")

austria_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Austria") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
austria_data


austria2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Austria") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
austria2_data

write.csv(austria2_data, 'austria2.csv')




belgium2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Belgium") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
belgium2_data

write.csv(belgium2_data, 'belgium2.csv')



germany2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Germany") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
germany2_data

write.csv(germany2_data, 'germany2.csv')



denmark2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Denmark") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
denmark2_data

write.csv(denmark2_data, 'denamrk2.csv')




france2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "France") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
france2_data

write.csv(france2_data, 'france2.csv')




uk2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "United Kingdom") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
uk2_data

write.csv(uk2_data, 'uk2.csv')



italy2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Italy") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
italy2_data

write.csv(italy2_data, 'italy2.csv')




netherlands2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Netherlands") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
netherlands2_data

write.csv(netherlands2_data, 'netherlands2.csv')




swedens2_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass  %in% c("Other children","Adolescents","Adults","Elderly","Very elderly"),
         Country == "Sweden") %>%
  select(Country,FoodexL1, Mean, PopClass) %>%
  dplyr::group_by(FoodexL1, PopClass) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0))
sweden2_data

write.csv(sweden2_data, 'sweden2.csv')






message("2")

belgium_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Belgium") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
belgium_data

message("3")

denmark_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Denmark") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
denmark_data

message("4")

france_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "France") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
france_data

message("5")

germany_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Germany") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
germany_data

message("6")

italy_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Italy") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
italy_data

message("7")

netherlands_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Netherlands") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
netherlands_data

message("8")

sweden_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "Sweden") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
sweden_data

message("9")

uk_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Carbohydrates",
                         "Vegetables",
                         "Fruit and fruit products",
                         "Milk and dairy products", 
                         "Meats",
                         "Animal and vegetable fats and oils"),
         PopClass == "Adults",
         Country == "United Kingdom") %>%
  select(Country,FoodexL1, Mean) %>%
  dplyr::group_by(FoodexL1) %>%
  dplyr::summarise(Mean = sum(Mean)) %>%
  dplyr::mutate(Mean = round(Mean, 0)) %>%
  dplyr::mutate(total = sum(Mean))
uk_data

write.csv(austria_data, 'austria.csv')
write.csv(belgium_data, 'belgium.csv')
write.csv(denmark_data, 'denmark.csv')
write.csv(france_data, 'france.csv')
write.csv(germany_data, 'germany.csv')
write.csv(italy_data, 'italy.csv')
write.csv(netherlands_data, 'netherlands.csv')
write.csv(sweden_data, 'sweden.csv')
write.csv(uk_data, 'uk.csv')






foodConsume$Mean <- as.numeric(as.character(foodConsume$Mean))
foodConsume$Median <- as.numeric(as.character(foodConsume$Median))
foodConsume$P5 <- as.numeric(as.character(foodConsume$P5))
foodConsume$P95 <- as.numeric(as.character(foodConsume$P95))

carb_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Carbohydrates",  
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))

%>%
  dplyr::mutate(Mean = round(Mean, 0))


carb_full_data

write.csv(carb_full_data, "carb_full_data2.csv")


meat_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Meats",  
                PopClass == "Adults",
                Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))
meat_full_data

write.csv(meat_full_data, "meat_full_data2.csv")



fruit_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Fruit and fruit products",  
                PopClass == "Adults",
                Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))
fruit_full_data

write.csv(fruit_full_data, "fruit_full_data2.csv")




veg_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Vegetables",  
                PopClass == "Adults",
                Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))
veg_full_data

write.csv(veg_full_data, "veg_full_data2.csv")



fat_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Animal and vegetable fats and oils",  
                PopClass == "Adults",
                Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))
fat_full_data

write.csv(fat_full_data, "fat_full_data2.csv")






milk_full_data <- foodConsume %>%
  dplyr::filter(FoodexL1 == "Milk and dairy products",  
                PopClass == "Adults",
                Country %in% c("Austria", "Belgium",  "Germany", "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden")) %>%
  dplyr::select(Country, Mean, STD, P5, Median, P95)%>%
  dplyr::group_by(Country) %>%
  dplyr::summarise(Mean = sum(Mean), STD = sum(STD), P5 = sum(P5), Median = sum(Median), P95 = sum(P95))
milk_full_data

write.csv(milk_full_data, "milk_full_data2.csv")






starchall_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Starchy roots and tubers","Grains and grain-based products"), 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  select(Country, FoodexL1, Mean, PopClass, PercConsumers )

group_by(Country) %>%

starchall_data$Mean <- as.numeric(as.character(starchall_data$Mean))

starchall_data

write.csv(plot_data2,'countrynpop_2.csv')

meat_data <- foodConsume %>%
  filter(FoodexL1=="Meat and meat products (including edible offal)", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

meat_data$Mean <- as.numeric(as.character(meat_data$Mean))

meat_data <- meat_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

meat_data

write.csv(meat_data, 'meat.csv')

fish_data <- foodConsume %>%
  filter(FoodexL1=="Fish and other seafood (including amphibians, rept", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

fish_data$Mean <- as.numeric(as.character(fish_data$Mean))

fish_data <- fish_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

fish_data

write.csv(fish_data, 'fish.csv')



egg_data <- foodConsume %>%
  filter(FoodexL1=="Eggs and egg products", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

egg_data$Mean <- as.numeric(as.character(egg_data$Mean))

egg_data <- egg_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

egg_data

write.csv(egg_data, 'egg.csv')


veg_data <- foodConsume %>%
  filter(FoodexL1=="Vegetables and vegetable products (including fungi", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

veg_data$Mean <- as.numeric(as.character(veg_data$Mean))

veg_data <- veg_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

veg_data

write.csv(veg_data, 'veg.csv')



legume_data <- foodConsume %>%
  filter(FoodexL1=="Legumes, nuts and oilseeds", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

legume_data$Mean <- as.numeric(as.character(legume_data$Mean))

legume_data <- legume_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

legume_data

write.csv(legume_data, 'legume.csv')





milk_data <- foodConsume %>%
  filter(FoodexL1=="Milk and dairy products", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

milk_data$Mean <- as.numeric(as.character(milk_data$Mean))

milk_data <- milk_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

milk_data

write.csv(milk_data, 'milk.csv')



fat_data <- foodConsume %>%
  filter(FoodexL1=="Animal and vegetable fats and oils", 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

fat_data$Mean <- as.numeric(as.character(fat_data$Mean))

fat_data <- fat_data %>% 
  dplyr::mutate(Mean = round(Mean, 0))

fat_data

write.csv(fat_data, 'fat.csv')






overallFood_data <- foodConsume %>%
  filter(FoodexL1 %in% c("Starchy roots and tubers","Grains and grain-based products"), 
         PopClass == "Adults",
         Country %in% c("Austria", "Belgium", "Denmark", "France", "Germany", "Italy", "Netherlands", "Sweden", "United Kingdom")) %>%
  group_by(Country) %>%
  select(Country, Mean)

overallFood_data$Mean <- as.numeric(as.character(overallFood_data$Mean))

overallFood_data %>% 
  mutate(Mean = ifelse(Country == Country, sum(Mean), Mean))

summarise_at(vars(Mean), funs(mean(., na.rm=TRUE)))

aggregate(plot_data[, 3], list(plot_data$Country), mean)

grain <- ggplot(data = grain_data, aes(x=Country, y= Mean)) +
  geom_bar(aes(fill=Country), stat="identity") +
  ggtitle("Number of suicide cases by method")+
  xlab("Country") + ylab("g/day")

grain + 
  theme_minimal()+
  theme(legend.position = "none",
        plot.title = element_text(size=14, face="bold", hjust = 0.5), 
        axis.text.x = element_text(size = 9, angle = 45, hjust = 1))

starchy <- ggplot(data = starchy_data, aes(x=Country, y= Mean)) +
  geom_bar(aes(fill=Country), stat="identity") +
  ggtitle("Number of suicide cases by method")+
  xlab("Country") + ylab("g/day")

starchy + 
  theme_minimal()+
  theme(legend.position = "none",
        plot.title = element_text(size=14, face="bold", hjust = 0.5), 
        axis.text.x = element_text(size = 9, angle = 45, hjust = 1))

starchall <- ggplot(data = starchall_data, aes(x=Country, y= Mean)) +
  geom_bar(aes(fill=FoodexL1), stat="identity") +
  ggtitle("Number of suicide cases by method")+
  xlab("Country") + ylab("g/day")

starchall + 
  theme_minimal()+
  theme(legend.position = "none",
        plot.title = element_text(size=14, face="bold", hjust = 0.5), 
        axis.text.x = element_text(size = 9, angle = 45, hjust = 1))




