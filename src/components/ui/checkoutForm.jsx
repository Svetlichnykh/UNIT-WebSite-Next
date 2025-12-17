"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CheckoutForm = ({ customerInfo, setCustomerInfo }) => {
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState();

  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [password, setPassword] = useState("");

  const handleCheckboxChange = (checked) => {
    setIsCreateAccount(checked);
    if (!checked) {
      setPassword("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // ✔️ Исправлено — обновляем customerInfo только при смене country
  useEffect(() => {
    document.body.style.cssText = `overflow:auto !important; margin-right:0 !important`;
    setCustomerInfo((prev) => ({ ...prev, country }));
  }, [country, setCustomerInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value, country }));
  };

  return (
    <form>
      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col justify-between gap-[22px]">
          <Input
            className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
            onChange={handleInputChange}
            type="text"
            name="first_name"
            placeholder="First name *"
          />
          <Input
            className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
            onChange={handleInputChange}
            type="text"
            name="last_name"
            placeholder="Last name *"
          />
        </div>

        <Input
          className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
          onChange={handleInputChange}
          type="text"
          name="company_name"
          placeholder="Company name"
        />

        <Select onOpenChange={setOpen} onValueChange={setCountry}>
          <SelectTrigger className="rounded-none py-[14px] h-15 text-lg font-medium focus:ring-offset-0 text-primary outline-none border-[1px] border-primary">
            <SelectValue placeholder="Country/Region *" />
          </SelectTrigger>
          <SelectContent className="rounded-none py-[14px] bg-primary">
            <SelectItem
              value="united-states"
              className="text-lg font-medium cursor-pointer text-secondary-foreground"
            >
              United States
            </SelectItem>
            <SelectItem
              value="united-kingdom"
              className="text-lg font-medium cursor-pointer text-secondary-foreground"
            >
              United Kingdom
            </SelectItem>
            <SelectItem
              value="bangladesh"
              className="text-lg font-medium cursor-pointer text-secondary-foreground"
            >
              Bangladesh
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
          onChange={handleInputChange}
          type="text"
          name="house_number"
          placeholder="House number & Street name"
        />

        <Input
          className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
          onChange={handleInputChange}
          type="text"
          name="apartment"
          placeholder="Apartment, suit, unit, etc (optional)"
        />

        <Input
          className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
          onChange={handleInputChange}
          type="text"
          name="city"
          placeholder="Town/city *"
        />

        <div className="flex flex-col justify-between gap-[22px]">
          <Input
            className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
            onChange={handleInputChange}
            type="text"
            name="postcode"
            placeholder="Postcode *"
          />
          <Input
            className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
            onChange={handleInputChange}
            type="text"
            name="phone"
            placeholder="Phone *"
          />
        </div>

        <Input
          className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
          onChange={handleInputChange}
          type="email"
          name="email"
          placeholder="Email Address *"
        />
      </div>

      {/* Create account */}
      <div className="flex items-center gap-4 mt-[18px]">
        <Checkbox
          id="terms"
          className="rounded-none w-[14px] h-[14px] flex justify-center items-center"
          checked={isCreateAccount}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="terms" className="text-lg text-primary font-semibold">
          Create an account?
        </Label>
      </div>

      {isCreateAccount && (
        <div className="lg:w-6/12 w-full mt-1">
          <Input
            className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg outline-none border-[1px] border-primary"
            onChange={handlePasswordChange}
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password*"
          />
        </div>
      )}

      <span className="block w-full h-[1px] bg-secondary my-7.5"></span>

      <Textarea
        className="placeholder:text-primary font-medium rounded-none py-[14px] text-lg mt-11 min-h-[200px] outline-none border-[1px] border-primary"
        onChange={handleInputChange}
        placeholder="Order notes (optional)"
        name="notes"
      />
    </form>
  );
};

export default CheckoutForm;
