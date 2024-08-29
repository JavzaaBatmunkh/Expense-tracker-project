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
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Square } from "lucide-react";
const categoryIcons = [
  { name: "transportation", Icon: Bus },
  { name: "ferriswheel", Icon: FerrisWheel },
  { name: "drama", Icon: Drama },
  { name: "phone", Icon: SmartphoneNfc },
  { name: "chart", Icon: ChartCandlestick },
  { name: "restaurant", Icon: Utensils },
  { name: "cherry", Icon: Cherry },
  { name: "ice-cream", Icon: IceCreamCone },
  { name: "car", Icon: CarFront },
  { name: "shopping", Icon: ShoppingCart },
  { name: "shirt", Icon: Shirt },
  { name: "dollar", Icon: BadgeDollarSign },
  { name: "fuel", Icon: Fuel },
  { name: "plane", Icon: Plane },
  { name: "train", Icon: TramFront },
  { name: "bathroom", Icon: Bath },
  { name: "coins", Icon: HandCoins },
  { name: "tent", Icon: TentTree },
  { name: "graduation", Icon: GraduationCap },
  { name: "laptop", Icon: Laptop },
  { name: "hospital", Icon: Hospital },
  { name: "home", Icon: House }
]
const categoryColors = [{ name: "blue", value: "#0166FF" }, { name: "light-blue", value: "#01B3FF" },
{ name: "green", value: "#41CC00" }, { name: "yellow", value: "#F9D100" }, { name: "orange", value: "#FF7B01" }, { name: "purple", value: "#AE01FF" }, { name: "red", value: "#FF0101" },]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState("home")
  const [color, setColor] = useState("blue")
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading]=useState(false)


  useEffect(() => {
    if (open === true){
      setColor("blue")
    }

  }, [open]);


  function loadList() {
    fetch("http://localhost:4000/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  useEffect(() => {
    loadList()
  }, [])

  function createNew() {
    setLoading(true)
    fetch(`http://localhost:4000/categories`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newCategory,
          color: color,
          icon: icon
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(res => res.json())
      .then((data) => {
        loadList();
        setLoading(false)
        setOpen(false);
        toast("Category has been created successfully.")
      })
  }

  function deleteCategory(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`http://localhost:4000/categories/${id}`,
        {
          method: "DELETE",
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

  const date = new Date()
  console.log(date);

  return (
    <main >
      <Toaster />
      {/* add record button */}
      <Button onClick={createNew} >+ Add New Record</Button>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <hr />
            <DialogDescription className="grid grid-cols-2 gap-4">
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
      {/* categories printed displayed */}
      {categories.map((category) => (
        <div key={category.id} className="flex gap-2">
          <CategoryIcon iconName={category.icon} color={category.color} />
          {category.name}
          <Button onClick={() => updateCategory(category.id, category.name)}>edit</Button>
          <Button onClick={() => deleteCategory(category.id)}>delete</Button>
        </div>
      ))}
      {/* add new category button */}
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
                    {categoryIcons.map(({ name, Icon }) =>
                      <div className={`relative w-8 h-8 flex justify-center items-center rounded-lg
                      ${icon === name ? "bg-blue-300 border-blue-950" : ""}`} value={name} key={name}
                        onClick={() => setIcon(name)}>
                        {<Icon />}
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
              <Input placeholder="Name" type="text" value={newCategory} disabled={loading}
                onChange={(event) => { setNewCategory(event.target.value) }} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={createNew} className="bg-green-700 hover:bg-green-900" disabled={loading}>Add</Button>
            
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
function CategoryIcon({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === iconName)
  const colorObject = categoryColors.find((item) => item.name === color)
  if (!iconObject) { return <House/> }
  
  let hexcolor;
  if (!colorObject) { hexcolor = "#000" }
  else { hexcolor = colorObject.value }
  const { Icon } = iconObject
  return <Icon style={{color: hexcolor}}/>
}
