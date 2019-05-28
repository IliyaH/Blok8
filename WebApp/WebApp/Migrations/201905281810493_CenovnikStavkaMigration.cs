namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CenovnikStavkaMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CenovnikStavkas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Cena = c.Double(nullable: false),
                        IdCenovnik = c.Int(nullable: false),
                        IdStavka = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cenovniks", t => t.IdCenovnik, cascadeDelete: true)
                .ForeignKey("dbo.Stavkas", t => t.IdStavka, cascadeDelete: true)
                .Index(t => t.IdCenovnik)
                .Index(t => t.IdStavka);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CenovnikStavkas", "IdStavka", "dbo.Stavkas");
            DropForeignKey("dbo.CenovnikStavkas", "IdCenovnik", "dbo.Cenovniks");
            DropIndex("dbo.CenovnikStavkas", new[] { "IdStavka" });
            DropIndex("dbo.CenovnikStavkas", new[] { "IdCenovnik" });
            DropTable("dbo.CenovnikStavkas");
        }
    }
}
