# Cal-BuniCorn-Battlet
Extension calculator for BuniCorn Game
![2021-09-28_23-52-38](https://user-images.githubusercontent.com/7509414/135131390-c6013eec-2000-4d31-ba3e-a67b6ce2ce53.png)

# Fighting
Player Base Power
Player Base Power is the variable used to determine the range of enemy power rolls.

Where:
trainerPower is the listed power displayed on the Trainer card. It increase as the trainer is leveled up especially once the trainer passed the fusion checkpoints. For the list of trainer power and the corresponding level, please see this.

bunicornPowerMultiplier = 1 + SUM(attribute * factor) / attributeBaseline

attributeBaseline = 500. This is the average attribute value of a Bunicorn.
Factor can be calculated based on the original and bonus attributes of a Bunicorn as follows:
If the attribute has the same element with Bunicorn, factor = 1.1
If the attribute is NEUTRAL, factor = 1.05
Bonus attribute has factor = 1.05
For the rest, factor = 1


BUR Payout 
The formula to determine BUR payout is as follows:

Where:
rewardGasOffset is mainly to cover the blockchain gas fee, now is set = $0.5
rewardBaseline is a constant which is $0.4
rewardMultiplier = √(enemyPower/1000*bunicornStar)
If you're fighting against the same enemy, a higher bunicorn star will give you better rewards.
These figures are subject to change in the future as the creators work to adjust the game's economic.

# Chrome Web Store

# How to manual install:
Extract above archive into your persistent drive (Try not to put in Desktop or Downloads folder)
In Chrome, go to Menu > More tools > Extensions
Toggle on the "Developer mode"
Click "Load unpacked" then select the folder that you extracted the package.
On the Battle screen of Bunicorn game, after select Trainer and Bunicoin, click to any space on the screen Enjoy the game!

# Disclaimer:
This extension is using HTML manipulation to read the Bunicorn Battle information, so it is not always accurate. Use it as your own risk.
The information provided by this extension are mainly for your reference only. You're response for your own choice in the battle.

