"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Square } from "lucide-react";
const categoryIcons = [
  { value: "transportation", path: <Bus /> },
  { value: "ferriswheel", path: <FerrisWheel /> },
  { value: "drama", path: <Drama /> },
  { value: "phone", path: <SmartphoneNfc /> },
  { value: "chart", path: <ChartCandlestick /> },
  { value: "restaurant", path: <Utensils /> },
  { value: "cherry", path: <Cherry /> },
  { value: "ice-cream", path: <IceCreamCone /> },
  { value: "car", path: <CarFront /> },
  { value: "shopping", path: <ShoppingCart /> },
  { value: "shirt", path: <Shirt /> },
  { value: "dollar", path: <BadgeDollarSign /> },
  { value: "fuel", path: <Fuel /> },
  { value: "plane", path: <Plane /> },
  { value: "train", path: <TramFront /> },
  { value: "bathroom", path: <Bath /> },
  { value: "coins", path: <HandCoins /> },
  { value: "tent", path: <TentTree /> },
  { value: "graduation", path: <GraduationCap /> },
  { value: "laptop", path: <Laptop /> },
  { value: "hospital", path: <Hospital /> }
]
const categoryColors = [{ name: "blue", value: "#0166FF" }, { name: "light-blue", value: "#01B3FF" },
{ name: "green", value: "#41CC00" }, { name: "yellow", value: "#F9D100" }, { name: "orange", value: "#FF7B01" }, { name: "purple", value: "#AE01FF" }, { name: "red", value: "#FF0101" },]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("")
  const [newCategory, setNewCategory] = useState("")

  function loadList() {
    fetch("http://localhost:4000/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  useEffect(() => {
    loadList()
  }, [])

  function createNew() {
    // const name = prompt("Name...")
    fetch(`http://localhost:4000/categories`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newCategory,
          color: color,
          icon: icon
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(res => res.json())
      .then((data) => {
        loadList();
        setOpen(false);
      })

  }

  function deleteCategory(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`http://localhost:4000/categories/${id}`,
        {
          method: "DELETE",
          // body: JSON.stringify({id: id}),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(() => { loadList() })
    }
    else { }
  }

  function updateCategory(id, name) {
    const newName = prompt("Edit category name...", name)
    if (newName) {
      fetch(`http://localhost:4000/categories/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ id: id, newName: newName, color: color, icon: icon }),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }
      )
        .then(res => res.json())
        .then((data) => { loadList() })
    }
    else { }
  }
  const handleInputChangeCategory = (event) => {
    setNewCategory(event.target.value)
  }

  const date = new Date()
  console.log(date);

  return (
    <main >
      <Button onClick={createNew} >+ Add New Record</Button>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <hr />
            <DialogDescription className="grid grid-cols-2">
              <div>
                <Tabs defaultValue="account" className="w-full ">
                  <TabsList className="w-full rounded-full">
                    <TabsTrigger value="account" className="w-[50%] rounded-full">Expense</TabsTrigger>
                    <TabsTrigger value="password" className="w-[50%] rounded-full">Income</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <p className="text-left">Amount</p>
                    <Input className="" placeholder="$000.00" />
                    Category
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Find or choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </TabsContent>
                  <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
              </div>
              <div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Payee</Label>
                  <Input type="email" id="email" placeholder="Write here" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Note</Label>
                  <Textarea placeholder="Write here" />
                </div>
                


              </div>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


      {categories.map((category) => (
        <div key={category.id} className="flex gap-2">
          {category.name}
          <Button onClick={() => updateCategory(category.id, category.name)}>edit</Button>
          <Button onClick={() => deleteCategory(category.id)}>delete</Button>
        </div>
      ))}

      <Button onClick={() => setOpen(true)} variant="outline" >+ Add New Category</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <hr />
            <DialogDescription className="flex gap-4">
              <Popover>
                <PopoverTrigger><House /></PopoverTrigger>
                <PopoverContent >
                  <div className="grid grid-cols-4 gap-2">
                    {categoryIcons.map(({ value, path }) =>
                      <div className={`relative w-8 h-8 flex justify-center items-center rounded-lg
                      ${icon === value ? "bg-blue-300 border-blue-950" : ""}`} value={value} key={value}
                        onClick={() => setIcon(value)}>
                        {path}
                      </div>)}
                  </div>
                  <hr className="my-4" />
                  <div className="flex gap-1">
                    {categoryColors.map(({ name, value }) =>
                      <div key={name} className="rounded-full h-8 w-8 flex justify-center items-center" style={{ background: value }}
                        onClick={() => setColor(name)}>
                        {color === name && <Check className="text-white w-4" />}
                      </div>)}
                  </div>
                </PopoverContent>
              </Popover>
              <Input placeholder="Name" type="text" onChange={handleInputChangeCategory} value={newCategory} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={createNew} className="bg-green-700 hover:bg-green-900">Add</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </main>
  );
}
