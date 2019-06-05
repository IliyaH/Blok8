namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KorisnikKartaMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Koeficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TipKorisnika = c.Int(nullable: false),
                        Koef = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.KorisnikKartas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdKorisnik = c.Int(nullable: false),
                        IdKarta = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Kartas", t => t.IdKarta, cascadeDelete: true)
                .ForeignKey("dbo.Korisniks", t => t.IdKorisnik, cascadeDelete: true)
                .Index(t => t.IdKorisnik)
                .Index(t => t.IdKarta);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.KorisnikKartas", "IdKorisnik", "dbo.Korisniks");
            DropForeignKey("dbo.KorisnikKartas", "IdKarta", "dbo.Kartas");
            DropIndex("dbo.KorisnikKartas", new[] { "IdKarta" });
            DropIndex("dbo.KorisnikKartas", new[] { "IdKorisnik" });
            DropTable("dbo.KorisnikKartas");
            DropTable("dbo.Koeficients");
        }
    }
}
