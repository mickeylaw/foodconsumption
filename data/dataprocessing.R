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

R_DATA_GENERAL <<- "/Users/howinglaw/Desktop/Project/data/"

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

message("RQ2: How the suicide rate change according to education level and age?")

plot_data2 <- suicideCase %>%
  dplyr::filter(Education!="unknown")%>%
  dplyr::count(Education, Age) 
head(plot_data2)

eduAge <- ggplot(data = plot_data2, aes(x=Education, y=Age)) + 
  geom_point(aes(size=n)) +
  ggtitle("Suicide Cases by Age and Education Level")+
  xlab("Education Level") + ylab("Age") +
  labs(size = "Number of cases")

"eduage <- eduage + theme(legend.title = element_blank())"

eduAge + 
  theme_minimal()+
  theme(legend.position = "right",
        legend.text = element_text(size = 10),
        plot.title = element_text(size=14, face="bold", hjust = 0.5), 
        axis.text.x = element_text(angle = 45, hjust = 1))

violin <- ggplot(data = plot_data2, aes(x=Education, y=Age)) + 
  geom_violin(scale = "count", adjust = .5) + 
  ggtitle("Suicide Cases by Age and Education Level")+
  labs(x="Education level",
       y="Age") +
  geom_boxplot(width=0.05)

violin + 
  theme_minimal()+
  theme(plot.title = element_text(size=14, face="bold", hjust = 0.5), 
        axis.text.x = element_text(angle = 45, hjust = 1))

g <- ggplot(data = plot_data2, aes(x=Education, y=Age)) +
  geom_dotplot(binaxis='y', stackdir='center', dotsize=0.2)
g

message("RQ3: How does the number of suicide of male and female change in time?")

plot_data3 <- suicideCase %>%
  dplyr::count(Sex, Year)
head(plot_data3)

sexyear <- ggplot() + 
  geom_line(aes(y = n, x = Year, color = Sex),
  size = 1.1, data = plot_data3, stat="identity")+
  ggtitle("Suicide Cases by Year and Sex")+
  xlab("Year") + ylab("Number of cases")+
  scale_x_continuous(breaks = scales::pretty_breaks(n = 3))

sexyear + 
  theme_minimal()+
  theme(legend.title = element_blank(),
        legend.text = element_text(size = 10),
        legend.position = "right",
        plot.title = element_text(size=14, face="bold", hjust = 0.5))

message("RQ4: Was there a particular month(or season) that suicide most likely happened?")

plot_data4 <- suicideCase %>%
  dplyr::count(Year, Month)
head(plot_data4)


'mon <- ggplot(data = plot_data4, aes(x=Month, y=n, fill=factor(Year))) + 
  geom_bar(stat = "identity", position="dodge2") +
  scale_x_continuous(breaks = scales::pretty_breaks(n = 12))+
  theme_minimal()+
  ggtitle("Suicide Cases by Month and Year")+
  xlab("Month") + ylab("Number of cases") 


mon + theme(
  plot.title = element_text(size=14, face="bold", hjust = 0.5)) '

mon2 <- ggplot() + 
  geom_line(aes(y = n, x = Month, color = factor(Year)),
            data = plot_data4, stat="identity", size = 1.1)+
  ggtitle("Suicide Cases by Month and Year")+
  xlab("Month") + ylab("Number of cases")+
  scale_x_continuous(breaks = scales::pretty_breaks(n = 12))+
  labs(colour = "Year")

mon2 +
  theme_minimal() +
  theme(legend.text = element_text(size = 10),
        legend.position = "right",
        plot.title = element_text(size=14, face="bold", hjust = 0.5))

message("RQ5: Which method most likely to survive and which most likely to die? ")

plot_data5 <- suicideCase %>%
  dplyr::filter(method!="Others" & method!="unspecified")%>%
  dplyr::group_by(method, Died) %>%
  dplyr::summarise(n=n()) %>%
  dplyr::mutate(perc = n / sum(n)) %>%
  dplyr::mutate(rounded = round(perc, 2))

'new.plot_data5 <- with(plot_data5, ifelse(Died == "yes", -perc, perc))
new.plot_data5'

neg <- plot_data5$Died == "yes"
plot_data5$n[neg] = -abs(plot_data5$n[neg])

perc2 <- plot_data5$perc
plot_data5$rounded = percent(plot_data5$rounded, d = 0)
head(plot_data5)

  
"treeMapPlot <- ggplot(plot_data5, aes(area = n, fill = Died, label = perc, subgroup = method)) + 
  geom_treemap() +
  geom_treemap_text(place = 'centre', colour = 'white', size = '8') +
  geom_treemap_subgroup_border(colour = 'black') +
  geom_treemap_subgroup_text(place = 'centre', colour = 'black')

treeMapPlot"

brks <- seq(-1000, 1000, 200)
lbls = paste0(as.character(c(seq(1000, 0, -200), seq(200, 1000, 200))))

deathrate <- ggplot(plot_data5, aes(x = method, y = n , fill = Died)) +   # Fill column
  geom_bar(stat = "identity", width = .6) +   # draw the bars
  scale_y_continuous(breaks = brks,   # Breaks
                     labels = lbls) +
  coord_flip() +  # Flip axes
  labs(title="Death rate on suicide methods") +
  xlab("Method") + ylab("Number of cases") 

deathrate + 
  theme(plot.title = element_text(size=14, face = "bold", hjust = 0.5)) +  # Centre plot title
  geom_text(check_overlap = TRUE, aes(label = rounded, x = method, y = n), size = 2.4, vjust = -2.8) +
  scale_fill_manual(values = c("#619CFF", "#F8766D"))

deathrate2 <- ggplot(data = plot_data5, aes(x = "", y = rounded, fill = Died)) + 
  geom_bar(stat = "identity") +
  geom_text(aes(label = rounded), position = position_stack(vjust = 0.5), size = 3) +
  coord_polar(theta = "y") +
  ggtitle("Death rate on suicide methods") +
  facet_grid(facets=. ~ method) +
  scale_fill_manual(values = c("#808080", "#F8766D"))

deathrate2 +
  theme(legend.position = "bottom",
        plot.title = element_text(size=14, face = "bold", hjust = 0.5),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank(),
        panel.grid  = element_blank()) 

message("RQ6: What occupation is the most common in commiting suicide? Is it in urban area?")

plot_data6 <- suicideCase %>%
  dplyr::filter(Urban != "unknown") %>%
  dplyr::count(Occupation, Urban)
head(plot_data6)

treeMapPlot2 <- ggplot(plot_data6, aes(area = n, fill = Urban, subgroup = Occupation)) + 
  geom_treemap() +
  geom_treemap_subgroup_border(colour = 'black') +
  geom_treemap_subgroup_text(place = 'centre', colour = 'black') +
  theme(
    plot.title = element_text(size=14, face = "bold", hjust = 0.5))+
  labs(title="")

treeMapPlot2

treeMapPlot3 <- ggplot(plot_data6, aes(area = n, label = Occupation, fill = Urban, subgroup = Urban)) + 
  geom_treemap() +
  geom_treemap_subgroup_border(colour = 'black') +
  geom_treemap_text(place = 'centre', colour = 'black') +
  ggtitle("Occupation and Area of People Attempting Suicide")

treeMapPlot3 +
  theme_minimal() +
  theme(plot.title = element_text(size=14, face = "bold", hjust = 0.5))

message("RQ7: How the suicide attempt number and suicide death number changed between 2009 and 2011?")

plot_data7 <- suicideCase %>%
  dplyr::count(Year, Month) %>% 
  unite("Year_Month", Year, Month, sep = "/")
head(plot_data7)
plot_data8 <- suicideCase %>%
  dplyr::filter(Died!="no") %>%
  unite("Year_Month", Year, Month, sep = "/") %>%
  dplyr::count(Year_Month, Died)
head(plot_data8)

plot_data7$Year_Month <- factor(plot_data7$Year_Month, levels = plot_data7$Year_Month)
plot_data8$Year_Month <- factor(plot_data8$Year_Month, levels = plot_data8$Year_Month)

casedeath <- ggplot() + 
  geom_line(aes(y = n, x = Year_Month, group=1, colour = "Suicide attempts"),
            data = plot_data7, stat="identity")+
  geom_line(aes(y = n, x = Year_Month, group=1, colour = "Suicide death"),
            data = plot_data8, stat="identity")+
  ggtitle("Suicide Attempts and Suicide Death Number between 2009 and 2011")+
  xlab("Year/Month") + ylab("Number of cases")+
  scale_colour_manual("", values = c("Suicide attempts" = "black", "Suicide death" = "red"))

casedeath + 
  theme_minimal() + 
  theme(plot.title = element_text(size=14, face="bold", hjust = 0.5), axis.text.x = element_text(angle = 65, hjust = 1))

message("RQ8: ?")

plot_data9 <- suicideCase %>%
  dplyr::filter(Occupation != "others/unknown", Education != "unknown")
  dplyr::select(Education, Occupation, Sex)
head(plot_data9)

ggplot(data = plot_data9) +
  geom_mosaic(aes(x = product(Education, Occupation), fill=Occupation), na.rm=TRUE) +  
  labs(x = "Occupation", y = "", title='Suicide attempters by occupation, education and sex') +
  facet_grid(Sex~.) +
  theme(
    plot.title = element_text(size=14, face="bold", hjust = 0.5), axis.text.x = element_text(size = 8, angle = 90, hjust = 1))


ggplot(data = plot_data9) +
  geom_mosaic(aes(x = product(Education, Occupation), fill=Education), na.rm=TRUE) +  
  labs(x = "Occupation", y = "", title='f(Occupation, Education| Sex)') +
  facet_grid(Sex~.) +
  theme(
    plot.title = element_text(size=14, face="bold", hjust = 0.5), 
    axis.text.x = element_text(size = 8, angle = 90, hjust = 1),
    legend.key = element_rect(color="white", size = 2))




