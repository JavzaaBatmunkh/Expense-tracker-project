"use client"
import { useQueryState } from 'nuqs'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Square } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { RecordDialog } from "@/components/recordDialog";
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams, useRouter } from 'next/navigation'

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
  const [loading, setLoading] = useState(false)
  const [editingCategory, setEditingCategory] = useState()
  const [transactions, setTransactions] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filterType, setFilterType] = useQueryState("filterType")
  const[categoryId, setCategoryId]=useQueryState("categoryId")

  function loadList() {
    fetch("http://localhost:4000/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  function loadTransactions() {
    fetch("http://localhost:4000/transaction")
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
  }

  function reset() {
    setColor("blue");
    setIcon("home");
    setNewCategory("")
    setEditingCategory(null)
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
      .then(() => {
        loadList();
        setLoading(false)
        setOpen(false);
        toast("Category has been created successfully.")
        reset()
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
        .then((res) => {
          if (res.status === 204) {
            loadList();
            toast('Success')
          }
          else {
            toast.error("ajskdljalksdjalskd skjks")
          }
        })
    }
    else { }
  }

  function updateCategory() {
    setLoading(true)

    fetch(`http://localhost:4000/categories/${editingCategory.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ newName: newCategory, color: color, icon: icon }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(() => {
        loadList();
        setLoading(false);
        setOpen(false);
        toast("Successfully updated.");
        reset()
      })
  }

  function deleteTransaction(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`http://localhost:4000/transaction/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(() => { loadTransactions() })
    }
    else { }
  }

  function loadTransactionsFiltered(categoryId) {
    fetch(`http://localhost:4000/transaction?categoryId=${categoryId}`)
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
  }

  function loadTransactionsFilteredByType(filterType) {
    if (filterType==="EXPENSE" || filterType==="INCOME"){
      fetch(`http://localhost:4000/transaction?filterType=${filterType}`)
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
    }
    else{ loadTransactions()
    }
  }

  function loadTransactionsFilteredBy2(filterType, categoryId) {
    console.log(filterType, categoryId)
    if (filterType==="EXPENSE" || filterType==="INCOME"){
      fetch(`http://localhost:4000/transaction?filterType=${filterType}&categoryId=${categoryId}`)
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
    }
    else{ loadTransactionsFiltered(categoryId)
    }
  }

  function toggleCategoryId(id){
    if (id=== categoryId){
      setCategoryId(null)
    }
    else{
      setCategoryId(id)
    }
  }

  // const date = new Date()
  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setNewCategory(editingCategory.name);
      setIcon(editingCategory.icon);
      setColor(editingCategory.color)
    }
  }, [editingCategory])

  useEffect(() => {
    if(categoryId&&filterType){loadTransactionsFilteredBy2(filterType, categoryId)}
    else if  (categoryId) {
      loadTransactionsFiltered(categoryId)
    }
    else if (filterType){loadTransactionsFilteredByType(filterType)}

    else {
      loadTransactions()
    }
  }, [categoryId, filterType])


  return (
    <main className="flex gap-10">
      <Header />
      <Sidebar />
      <RecordDialog onComplete={loadTransactions} />
      <Toaster richColors />
      <div>
      <RadioGroup value={filterType} onValueChange={(val) => setFilterType(val)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ALL" id="option-one" />
                                    <Label htmlFor="option-one">All</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="INCOME" id="option-two" />
                                    <Label htmlFor="option-two">Income</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="EXPENSE" id="option-three" />
                                    <Label htmlFor="option-three">Expense</Label>
                                </div>
                            </RadioGroup>
        {/* categories printed displayed */}

        {categories.map((category) => (
          <div key={category.id} className="flex gap-2">

            <div onClick={() =>toggleCategoryId(category.id)} className="flex gap-4">
              <CategoryIcon iconName={category.icon} color={category.color} />
              {category.name}
            </div>
            <Button onClick={() => setEditingCategory(category)}>edit</Button>
            <Button onClick={() => deleteCategory(category.id)}>delete</Button>
          </div>
        ))}
        {/* add new category button */}
        <Button onClick={() => { reset(); setOpen(true) }} variant="outline" >+ Add New Category</Button>
        <Dialog open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <hr />
              <DialogDescription className="flex gap-4">
                <Popover>
                  <PopoverTrigger><CategoryIcon iconName={icon} color={color} /></PopoverTrigger>
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
              {editingCategory ? (
                <Button onClick={updateCategory} className="bg-green-700 hover:bg-green-900" disabled={loading}>Update</Button>
              ) : (
                <Button onClick={createNew} className="bg-green-700 hover:bg-green-900" disabled={loading}>Add</Button>
              )}
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex gap-2">
            <Checkbox />
            <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ background: transaction.color }}>
              <CategoryIcon iconName={transaction.icon} className="text-white" />
            </div>
            {transaction.name}
            {transaction.amount}
            {transaction.time}
            <Button onClick={() => router.push(`?editing=${transaction.id}`)}>edit</Button>
            <Button onClick={() => deleteTransaction(transaction.id)}>delete</Button>
          </div>
        ))}
      </div>
    </main>
  );
}
function CategoryIcon({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === iconName)
  const colorObject = categoryColors.find((item) => item.name === color)
  if (!iconObject) { return <House /> }

  let hexcolor;
  if (!colorObject) { hexcolor = "#000" }
  else { hexcolor = colorObject.value }
  const { Icon } = iconObject
  return <Icon style={{ color: hexcolor }} />
}
