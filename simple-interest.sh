#!/bin/bash
# A simple script to calculate simple interest
echo "--- Simple Interest Calculator ---"
echo
# Get user input
read -p "Enter the principal amount (₹): " principal
read -p "Enter the annual interest rate (%): " rate
read -p "Enter the time period (in years): " time

# Calculate simple interest using bc for floating-point arithmetic
# The 'scale=2' command sets the number of decimal places to 2
si=$(echo "scale=2; $principal * $rate * $time / 100" | bc)

# Calculate the total amount
total=$(echo "scale=2; $principal + $si" | bc)

# Display the result
echo
echo "---------------------------------"
echo "Calculating..."
echo "---------------------------------"
echo "Principal Amount: ₹$principal"
echo "Annual Rate:      $rate%"
echo "Time Period:      $time years"
echo
echo "Simple Interest:  ₹$si"
echo "Total Amount:     ₹$total"
echo "---------------------------------"
