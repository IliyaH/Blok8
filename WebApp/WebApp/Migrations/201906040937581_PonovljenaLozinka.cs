namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PonovljenaLozinka : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Administrators", "PonovljenaLozinka", c => c.String());
            AddColumn("dbo.Kontrolors", "PonovljenaLozinka", c => c.String());
            AddColumn("dbo.Korisniks", "PonovljenaLozinka", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Korisniks", "PonovljenaLozinka");
            DropColumn("dbo.Kontrolors", "PonovljenaLozinka");
            DropColumn("dbo.Administrators", "PonovljenaLozinka");
        }
    }
}
